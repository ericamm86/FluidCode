import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { CrisisBarChart, EmotionLineChart } from "../components/ChartPanel";
import EmotionForm from "../components/EmotionForm";
import FaceEmotionDetector from "../components/FaceEmotionDetector";
import StatCard from "../components/StatCard";
import { getDashboard } from "../services/emotion.service";

const emptyDashboard = {
  resumo: {
    totalRegistros: 0,
    mediaEmocional: 0,
    nivelCaos: 0,
    mediaHumor: 0,
    mediaEstresse: 0,
    mediaEnergia: 0
  },
  semanal: [],
  mensal: [],
  crisesPorHorario: [],
  historico: []
};

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(emptyDashboard);
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    setLoading(true);
    try {
      const data = await getDashboard();
      setDashboard(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const { resumo } = dashboard;

  return (
    <div className="mx-auto max-w-[92rem] space-y-5 sm:space-y-6">
      <header className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="min-w-0">
          <span className="text-sm font-medium text-teal-300">Painel emocional</span>
          <h1 className="mt-2 text-2xl font-bold tracking-normal text-white sm:text-3xl">Dashboard</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Medias, tendencias e sinais de crise a partir dos seus registros.
          </p>
        </div>
        <button className="btn-secondary w-full sm:w-auto" onClick={loadDashboard} disabled={loading}>
          <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
          Atualizar
        </button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Media emocional" value={resumo.mediaEmocional} helper="Humor, energia e estabilidade." />
        <StatCard label="Nivel de caos" value={resumo.nivelCaos} helper="Estresse alto eleva este indice." tone="rose" />
        <StatCard label="Energia media" value={resumo.mediaEnergia} helper="Disposicao percebida." tone="amber" />
        <StatCard label="Registros" value={resumo.totalRegistros} helper="Entradas no historico." tone="sky" />
      </section>

      <FaceEmotionDetector onCreated={loadDashboard} />

      <EmotionForm onCreated={loadDashboard} />

      <section className="grid gap-6 xl:grid-cols-2">
        <EmotionLineChart title="Humor semanal" data={dashboard.semanal} />
        <EmotionLineChart title="Graficos mensais" data={dashboard.mensal} period="mensal" />
        <EmotionLineChart title="Historico emocional" data={dashboard.historico.slice(-14)} period="ultimos registros" />
        <CrisisBarChart data={dashboard.crisesPorHorario} />
      </section>
    </div>
  );
}
