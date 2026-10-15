'use client';

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import SummaryCard from "@/components/SummaryCard";
import ProductCard from "@/components/ProductCard";

export default function Page() {
  const dashboardData = {
    appName: "Inventory Mgmt System",
    user: "Noor Zahid",
  };

  // Day 2 Core Concept: State Management using useState Hook
  const [products, setProducts] = useState([
    { id: 1, name: 'iPhone 16 Pro', price: 999, category: 'Electronics', status: 'In Stock' },
    { id: 2, name: 'MacBook Pro M3', price: 1999, category: 'Computers', status: 'In Stock' },
    { id: 3, name: 'Samsung Galaxy S25', price: 899, category: 'Electronics', status: 'Low Stock' },
    { id: 4, name: 'AirPods Pro', price: 249, category: 'Accessories', status: 'In Stock' }
  ]);

  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  // Event Handler & State Update (Interactivity & Dynamic List Rendering)
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim() || !newProductPrice.trim()) return;

    const newItem = {
      id: Date.now(),
      name: newProductName,
      price: Number(newProductPrice),
      category: 'General',
      status: 'In Stock'
    };

    setProducts([newItem, ...products]);
    setNewProductName('');
    setNewProductPrice('');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar title={dashboardData.appName} userName={dashboardData.user} />

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <section className="mb-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">React Core Dashboard (Day 2: State & Interactivity)</h2>
          <p className="text-slate-600 text-sm">Demonstrating useState hook, event handling, form submission, and dynamic list rendering.</p>
        </section>

        {/* Summary Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard 
            title="Total Products" 
            value={products.length.toString()} 
            description="Active inventory catalog items"
          >
            <span className="text-xs font-semibold text-emerald-600">Live State Active (useState)</span>
          </SummaryCard>

          <SummaryCard 
            title="Total Orders" 
            value="45" 
            description="Processed orders for October"
          >
            <span className="text-xs font-medium text-sky-600">8 orders pending shipping</span>
          </SummaryCard>

          <SummaryCard 
            title="System Status" 
            value="Optimal" 
            description="Unidirectional Data Flow"
          >
            <span className="text-xs font-medium text-emerald-600">Target reached 95%</span>
          </SummaryCard>
        </section>

        {/* Day 2 Feature: Interactive Form for State Update */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Add New Inventory Item (Day 2 Interactivity)</h3>
          <form onSubmit={handleAddProduct} className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Product Name..." 
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              className="flex-1 border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <input 
              type="number" 
              placeholder="Price ($)..." 
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
              className="w-full md:w-48 border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-2 rounded-lg text-sm transition-colors shadow-sm">
              Add Product
            </button>
          </form>
        </div>

        {/* Product Cards Section with Dynamic Mapping */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Product Catalog (Dynamic List Rendering)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                name={product.name}
                price={product.price}
                category={product.category}
                status={product.status}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}