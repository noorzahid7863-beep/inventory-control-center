'use client';

import { Product } from '@/context/InventoryContext';

interface ProductCardProps {
  product: Product;
  onDelete: (id: string, name: string) => void;
  visualIcon: string;
}

export default function ProductCard({ product, onDelete, visualIcon }: ProductCardProps) {
  return (
    <div className="group relative bg-slate-900/70 backdrop-blur-xl p-6 rounded-2xl border border-slate-800/90 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between overflow-hidden">
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-lg bg-slate-800 text-blue-400 border border-slate-700/60 shadow-inner">
            {product.category}
          </span>
          <span className="text-2xl font-black text-emerald-400 font-mono">
            ${product.price}
          </span>
        </div>

        <div className="w-full h-32 my-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-300 shadow-inner">
          {visualIcon}
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors mt-2">
          {product.name}
        </h3>
      </div>
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center">
        <span className="text-xs text-slate-500 font-mono">Saved Item</span>
        <button
          onClick={() => onDelete(product.id, product.name)}
          className="text-xs font-bold text-rose-400 hover:text-rose-200 bg-rose-500/10 hover:bg-rose-500/20 px-4 py-2 rounded-xl border border-rose-500/20 transition-all active:scale-95 flex items-center gap-1.5"
        >
          <span>🗑️</span> Delete
        </button>
      </div>
    </div>
  );
}