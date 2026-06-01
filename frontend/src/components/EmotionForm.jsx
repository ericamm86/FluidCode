import { Save } from "lucide-react";
import { useState } from "react";
import { createEmotion } from "../services/emotion.service";

const initialState = {
  humor: 7,
  estresse: 4,
  energia: 6,
  anotacao: "",
  data: new Date().toISOString().slice(0, 10)
};

export default function EmotionForm({ onCreated }) {
  const [form, setForm] = useState(initialState);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      await createEmotion(form);
      setForm(initialState);
      onCreated?.();
    } catch (err) {
      setError(err.response?.data?.message || "Nao foi possivel salvar o registro.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="panel p-4 sm:p-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-white">Registro diario</h2>
        <p className="text-sm text-muted">Registre como voce chegou ate aqui hoje.</p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <RangeField label="Humor" value={form.humor} onChange={(value) => updateField("humor", value)} />
        <RangeField label="Estresse" value={form.estresse} onChange={(value) => updateField("estresse", value)} />
        <RangeField label="Energia" value={form.energia} onChange={(value) => updateField("energia", value)} />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[11rem_minmax(0,1fr)]">
        <label className="block">
          <span className="label">Data</span>
          <input
            className="input mt-2"
            type="date"
            value={form.data}
            onChange={(event) => updateField("data", event.target.value)}
          />
        </label>

        <label className="block">
          <span className="label">Anotacao</span>
          <textarea
            className="input mt-2 min-h-24 resize-y"
            value={form.anotacao}
            onChange={(event) => updateField("anotacao", event.target.value)}
            placeholder="O que marcou seu dia?"
          />
        </label>
      </div>

      {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}

      <button className="btn-primary mt-5 w-full sm:w-auto" type="submit" disabled={saving}>
        <Save size={18} />
        {saving ? "Salvando..." : "Salvar registro"}
      </button>
    </form>
  );
}

function RangeField({ label, value, onChange }) {
  return (
    <label className="block min-w-0 rounded-lg border border-line bg-[#10161d] p-4">
      <span className="flex items-center justify-between text-sm font-medium text-slate-300">
        {label}
        <strong className="text-lg text-white">{value}</strong>
      </span>
      <input
        className="mt-4 h-2 w-full accent-teal-300"
        min="1"
        max="10"
        type="range"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
