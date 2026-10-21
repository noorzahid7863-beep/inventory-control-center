'use client';

import React, { useState, useRef, useMemo, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import SummaryCard from '@/components/SummaryCard';
import ProductCard from '@/components/ProductCard';
import ExternalApiFeed from '@/components/ExternalApiFeed';
import { InventoryProvider, useInventory } from '@/context/InventoryContext';

const getProductImage = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('laptop') || lowerName.includes('computer') || lowerName.includes('macbook')) return '💻';
  if (lowerName.includes('mouse')) return '🖱️';
  if (lowerName.includes('keyboard')) return '⌨️';
  if (lowerName.includes('monitor') || lowerName.includes('screen')) return '🖥️';
  if (lowerName.includes('phone') || lowerName.includes('mobile')) return '📱';
  if (lowerName.includes('headphone') || lowerName.includes('headset')) return '🎧';
  if (lowerName.includes('chair') || lowerName.includes('desk')) return '🪑';
  if (lowerName.includes('camera')) return '📷';
  return '📦';
};

const AddProductForm = () => {
  const { dispatch, speak } = useInventory();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [price, setPrice] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    const numPrice = parseFloat(price);
    dispatch({
      type: 'ADD_PRODUCT',
      payload: { name, category, price: numPrice },
    });

    speak(`Added ${name} to inventory for ${numPrice} dollars.`);
    setName('');
    setPrice('');
    nameInputRef.current?.focus();
  };

  const previewIcon = name ? getProductImage(name) : '✨';

  return (
    <div className="bg-slate-900/80 backdrop-blur-2xl p-7 rounded-2xl border border-slate-800/90 shadow-2xl">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></span>
          Quick Add Product (With Voice & Visual Preview)
        </h2>
        <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300">
          <span>Auto Visual Preview:</span>
          <span className="text-2xl">{previewIcon}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2">Item Name</label>
          <input
            ref={nameInputRef}
            type="text"
            placeholder="Type e.g. Gaming Laptop..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm font-medium"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 text-sm font-medium"
          >
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="General">General</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2">Price ($ USD)</label>
          <input
            type="number"
            placeholder="e.g. 850"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm font-medium"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full h-[50px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-xl shadow-blue-600/30 text-sm flex items-center justify-center gap-2"
          >
            <span className="text-lg">＋</span> Add to Inventory
          </button>
        </div>
      </form>
    </div>
  );
};

const DashboardContent = () => {
  const { products, dispatch, speak } = useInventory();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  const categoriesCount = useMemo(() => new Set(products.map((p) => p.category)).size, [products]);
  const totalValue = useMemo(() => products.reduce((acc, p) => acc + p.price, 0), [products]);

  const handleDelete = useCallback((id: string, name: string) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
    speak(`Removed ${name} from inventory.`);
  }, [dispatch, speak]);

  return (
    <div className="space-y-8">
      <Navbar title="Inventory Control Center" userName="Noor Zahid" />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="Total Products" value={products.length} color="bg-blue-500" icon="📦" subtitle="Items in storage" />
        <SummaryCard title="Filtered View" value={filteredProducts.length} color="bg-indigo-500" icon="🔍" subtitle="Matching items" />
        <SummaryCard title="Categories" value={categoriesCount} color="bg-emerald-500" icon="🏷️" subtitle="Divisions" />
        <SummaryCard title="Total Valuation" value={`$${totalValue}`} color="bg-purple-500" icon="💎" subtitle="Calculated sum" />
      </div>

      <AddProductForm />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[300px]">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
            visualIcon={getProductImage(product.name)}
          />
        ))}
      </div>

      <ExternalApiFeed />
    </div>
  );
};

export default function Page() {
  return (
    <InventoryProvider>
      <main className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 lg:p-12 font-sans">
        <div className="w-full max-w-[1800px] mx-auto space-y-8">
          <DashboardContent />
        </div>
      </main>
    </InventoryProvider>
  );
}