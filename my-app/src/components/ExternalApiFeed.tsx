'use client';

import { useQuery } from '@tanstack/react-query';

interface ApiProduct {
  id: number;
  title: string;
  price: number;
  category: string;
}

const fetchExternalInventory = async (): Promise<ApiProduct[]> => {
  const res = await fetch('https://fakestoreapi.com/products?limit=3');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export default function ExternalApiFeed() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['externalInventory'],
    queryFn: fetchExternalInventory,
  });

  // 1. Loading State (Syllabus Requirement)
  if (isLoading) {
    return (
      <div className="p-4 border border-blue-500/30 bg-blue-950/20 rounded-xl animate-pulse text-blue-300">
        ⚡ Loading external supplier data via TanStack Query...
      </div>
    );
  }

  // 2. Error Boundary / State (Syllabus Requirement)
  if (isError) {
    return (
      <div className="p-4 border border-red-500/30 bg-red-950/20 rounded-xl text-red-400">
        ❌ Error fetching supplier data: {(error as Error).message}
      </div>
    );
  }

  // 3. Server State Rendered
  return (
    <div className="p-4 border border-emerald-500/30 bg-slate-900/60 rounded-xl text-slate-200 mt-6">
      <h3 className="text-lg font-bold text-emerald-400 mb-2">
        🌐 Live Supplier Feed (TanStack Query Cache)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {data?.map((item) => (
          <div key={item.id} className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
            <p className="font-semibold text-sm truncate">{item.title}</p>
            <p className="text-xs text-slate-400 capitalize">{item.category}</p>
            <p className="text-emerald-400 text-sm font-bold mt-1">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}