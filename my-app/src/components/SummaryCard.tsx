'use client';

interface SummaryCardProps {
  title: string;
  value: number | string;
  color: string;
  icon: string;
  subtitle: string;
}

export default function SummaryCard({ title, value, color, icon, subtitle }: SummaryCardProps) {
  return (
    <div className="relative group overflow-hidden bg-slate-900/80 backdrop-blur-2xl p-7 rounded-2xl border border-slate-800/90 hover:border-slate-700 transition-all duration-300 shadow-2xl">
      <div className={`absolute top-0 left-0 w-2 h-full ${color}`} />
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
          <h3 className="text-4xl font-black text-white mt-2 tracking-tight">{value}</h3>
          <p className="text-xs text-slate-500 mt-2 font-medium">{subtitle}</p>
        </div>
        <span className="text-3xl p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60 text-slate-200 shadow-inner">{icon}</span>
      </div>
    </div>
  );
}