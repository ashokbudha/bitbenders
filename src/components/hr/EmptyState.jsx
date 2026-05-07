export default function EmptyState({ title, description }) {
  return (
    <div className="rounded-xl border border-dashed border-brand-gray/25 bg-brand-neutral p-8 text-center">
      <h3 className="text-lg font-bold text-brand-black">{title}</h3>
      <p className="mt-2 text-sm text-brand-gray">{description}</p>
    </div>
  );
}
