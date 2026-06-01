import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { getEmotions } from "../services/emotion.service";

export default function History() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmotions()
      .then(setRecords)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-[92rem] space-y-5 sm:space-y-6">
      <header className="min-w-0">
        <span className="text-sm font-medium text-teal-300">Linha do tempo</span>
        <h1 className="mt-2 text-2xl font-bold tracking-normal text-white sm:text-3xl">Historico emocional</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Consulte registros, notas e variacoes de humor, estresse e energia.
        </p>
      </header>

      <section className="panel overflow-hidden">
        <div className="border-b border-line px-4 py-4 sm:px-5">
          <h2 className="text-lg font-semibold text-white">Registros</h2>
        </div>

        {loading ? (
          <p className="p-4 text-sm text-muted sm:p-5">Carregando historico...</p>
        ) : records.length === 0 ? (
          <p className="p-4 text-sm text-muted sm:p-5">Nenhum registro emocional cadastrado.</p>
        ) : (
          <div className="divide-y divide-line">
            {records.map((record) => (
              <article key={record.id} className="grid min-w-0 gap-4 px-4 py-4 sm:px-5 lg:grid-cols-[11rem_minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <CalendarDays size={17} className="text-teal-300" />
                  {new Date(record.data).toLocaleDateString("pt-BR")}
                </div>
                <div className="grid gap-3 text-sm min-[420px]:grid-cols-3">
                  <Metric label="Humor" value={record.humor} />
                  <Metric label="Estresse" value={record.estresse} tone="rose" />
                  <Metric label="Energia" value={record.energia} tone="amber" />
                </div>
                <p className="min-w-0 break-words text-sm text-slate-300">{record.anotacao || "Sem anotacao."}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Metric({ label, value, tone = "teal" }) {
  const colors = {
    teal: "text-teal-300",
    rose: "text-rose-300",
    amber: "text-amber-300"
  };

  return (
    <span className="min-w-0 rounded-lg border border-line bg-[#10161d] px-3 py-2">
      <small className="block text-xs text-muted">{label}</small>
      <strong className={colors[tone]}>{value}/10</strong>
    </span>
  );
}
