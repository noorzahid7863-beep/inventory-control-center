export default function SummaryCard({ title, value, description, children }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</h3>
      <p className="text-3xl font-extrabold text-slate-900 mb-2">{value}</p>
      <p className="text-xs text-slate-600 mb-4">{description}</p>
      {/* Component Composition using Children Prop */}
      {children && <div className="mt-2 pt-2 border-t border-slate-100">{children}</div>}
    </div>
  );
}