export default function DataCard({ title, value, hint }) {
  return (
    <div className="rounded-xl border border-brand-gray/20 bg-brand-white p-5 shadow-sm">
      <p className="text-xs uppercase tracking-wider text-brand-gray">{title}</p>
      <p className="mt-2 text-2xl font-bold text-brand-black">{value}</p>
      {hint ? <p className="mt-1 text-xs text-brand-gray">{hint}</p> : null}
    </div>
  );
}
