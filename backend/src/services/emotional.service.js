import { prisma } from "../config/prisma.js";

export async function createEmotionalRecord(userId, payload) {
  const data = payload.data ? new Date(payload.data) : new Date();

  return prisma.registroEmocional.create({
    data: {
      humor: Number(payload.humor),
      estresse: Number(payload.estresse),
      energia: Number(payload.energia),
      anotacao: payload.anotacao?.trim() || null,
      data,
      userId
    }
  });
}

export async function listEmotionalRecords(userId) {
  return prisma.registroEmocional.findMany({
    where: { userId },
    orderBy: { data: "desc" }
  });
}

export async function buildDashboard(userId) {
  const records = await prisma.registroEmocional.findMany({
    where: { userId },
    orderBy: { data: "asc" }
  });

  if (records.length === 0) {
    return {
      resumo: {
        totalRegistros: 0,
        mediaEmocional: 0,
        nivelCaos: 0,
        mediaHumor: 0,
        mediaEstresse: 0,
        mediaEnergia: 0
      },
      historico: [],
      semanal: [],
      mensal: [],
      crisesPorHorario: []
    };
  }

  const resumo = calculateSummary(records);

  return {
    resumo,
    historico: records.map(formatRecordForChart),
    semanal: groupRecords(records, "week"),
    mensal: groupRecords(records, "month"),
    crisesPorHorario: groupCrisesByHour(records)
  };
}

function calculateSummary(records) {
  const total = records.length;
  const mediaHumor = average(records, "humor");
  const mediaEstresse = average(records, "estresse");
  const mediaEnergia = average(records, "energia");
  const mediaEmocional = Math.round(((mediaHumor + mediaEnergia + (11 - mediaEstresse)) / 3) * 10) / 10;
  const nivelCaos = Math.round(((mediaEstresse * 0.55) + ((11 - mediaHumor) * 0.25) + ((11 - mediaEnergia) * 0.20)) * 10) / 10;

  return {
    totalRegistros: total,
    mediaEmocional,
    nivelCaos,
    mediaHumor,
    mediaEstresse,
    mediaEnergia
  };
}

function average(records, key) {
  const value = records.reduce((sum, record) => sum + record[key], 0) / records.length;
  return Math.round(value * 10) / 10;
}

function formatRecordForChart(record) {
  return {
    id: record.id,
    data: record.data,
    label: record.data.toISOString().slice(0, 10),
    humor: record.humor,
    estresse: record.estresse,
    energia: record.energia,
    anotacao: record.anotacao
  };
}

function groupRecords(records, period) {
  const groups = new Map();

  records.forEach((record) => {
    const key = period === "week" ? getWeekKey(record.data) : getMonthKey(record.data);
    const current = groups.get(key) || [];
    current.push(record);
    groups.set(key, current);
  });

  return Array.from(groups.entries()).map(([label, values]) => ({
    label,
    humor: average(values, "humor"),
    estresse: average(values, "estresse"),
    energia: average(values, "energia")
  }));
}

function groupCrisesByHour(records) {
  const crisisRecords = records.filter((record) => record.estresse >= 8 || record.humor <= 3);
  const groups = new Map();

  crisisRecords.forEach((record) => {
    const hour = String(record.data.getHours()).padStart(2, "0");
    groups.set(hour, (groups.get(hour) || 0) + 1);
  });

  return Array.from(groups.entries())
    .sort(([hourA], [hourB]) => Number(hourA) - Number(hourB))
    .map(([hour, total]) => ({
      label: `${hour}:00`,
      total
    }));
}

function getWeekKey(date) {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1);
  start.setDate(diff);
  start.setHours(0, 0, 0, 0);
  return `Semana ${start.toISOString().slice(5, 10)}`;
}

function getMonthKey(date) {
  return date.toLocaleDateString("pt-BR", {
    month: "short",
    year: "2-digit",
    timeZone: "UTC"
  });
}
