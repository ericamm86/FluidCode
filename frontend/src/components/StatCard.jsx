export default function StatCard({ label, value, helper, tone = "teal" }) {
  const tones = {
    teal: "text-teal-300",
    rose: "text-rose-300",
    amber: "text-amber-300",
    sky: "text-sky-300"
  };

  return (
    <article className="panel min-w-0 p-4 sm:p-5">
      <span className="text-sm text-muted">{label}</span>
      <strong className={`mt-3 block text-2xl font-bold sm:text-3xl ${tones[tone]}`}>{value}</strong>
      <p className="mt-2 text-sm text-slate-400">{helper}</p>
    </article>
  );
}
