import { api } from "./api";

export async function createEmotion(payload) {
  const { data } = await api.post("/emocao", payload);
  return data;
}

export async function getEmotions() {
  const { data } = await api.get("/emocoes");
  return data;
}

export async function getDashboard() {
  const { data } = await api.get("/dashboard");
  return data;
}
