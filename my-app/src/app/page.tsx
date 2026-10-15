'use client';

import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import SummaryCard from "@/components/SummaryCard";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  status: string;
}

export default function Page() {
  const dashboardData = {
    appName: "Inventory Mgmt System",
    user: "Noor Zahid",
  };

  // State Management
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'iPhone 16 Pro', price: 999, category: 'Electronics', status: 'In Stock' },
    { id: 2, name: 'MacBook Pro M3', price: 1999, category: 'Computers', status: 'In Stock' },
    { id: 3, name: 'Samsung Galaxy S25', price: 899, category: 'Electronics', status: 'Low Stock' },
    { id: 4, name: 'AirPods Pro', price: 249, category: 'Accessories', status: 'In Stock' }
  ]);

  // Controlled Form States
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Electronics');
  const [formError, setFormError] = useState('');

  // Conditional Rendering & Clock
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lastUpdated, setLastUpdated] = useState('');

  // 100% Working Speech Synthesis Function
  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // پچھلی آواز کینسل کریں
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;  // نارمل سپیڈ
      utterance.pitch = 1.0; // نارمل پچ
      utterance.volume = 1.0; // فل والیوم
      window.speechSynthesis.speak(utterance);
    }
  };

  // Side Effects for Clock
  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setLastUpdated(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Form Submission Handler with Voice
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) {
      setFormError('⚠️ Product name is required!');
      speakText('Please enter product name');
      return;
    }
    if (!newProductPrice || Number(newProductPrice) <= 0) {
      setFormError('⚠️ Please enter a valid price (> $0)!');
      speakText('Please enter a valid price');
      return;
    }

    const newItem: Product = {
      id: Date.now(),
      name: newProductName,
      price: Number(newProductPrice),
      category: newProductCategory,
      status: 'In Stock'
    };

    setProducts([newItem, ...products]);
    
    // 🔊 یہاں خود بخود بولے گا!
    speakText(`${newProductName} added successfully`);

    setNewProductName('');
    setNewProductPrice('');
    setNewProductCategory('Electronics');
    setFormError('');
  };

  // Delete Item with Voice
  const handleDeleteProduct = (id: number, name: string) => {
    setProducts(products.filter(p => p.id !== id));
    speakText(`${name} removed`);
  };

  // Filter Logic
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 antialiased selection:bg-sky-500/20 selection:text-sky-900 relative">
      
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-sky-200/50 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[150px]" />
      </div>

      <Navbar title={dashboardData.appName} userName={dashboardData.user} />

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        
        {/* === HERO HEADER SECTION === */}
        <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden border border-slate-800">
          <div className="space-y-3 z-10">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-sky-500/20 text-sky-300 text-xs font-bold px-4 py-1.5 rounded-full border border-sky-500/30">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
                Voice-Enabled React Core Dashboard
              </span>
              {/* Test Audio Button to Unlock Browser Speech */}
              <button 
                type="button"
                onClick={() => speakText("Voice system activated and ready.")}
                className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>🔊</span> Test Audio
              </button>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Inventory Master Dashboard
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Fully interactive system with Web Speech API audio synthesis, live state management, and category filtering.
            </p>
          </div>

          <div className="z-10 bg-slate-900/80 backdrop-blur-xl px-6 py-3.5 rounded-2xl border border-slate-700/80 shadow-2xl flex flex-col items-end min-w-[170px]">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold">System Clock</span>
            <span className="text-xl font-mono font-bold text-sky-400 tabular-nums">
              {lastUpdated || 'Syncing...'}
            </span>
          </div>
        </section>

        {/* === SUMMARY METRICS SECTION === */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard 
            title="Total Inventory Items" 
            value={products.length.toString()} 
            description="Live reactivity via useState & useEffect"
          >
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300">
              ✓ Voice Active
            </span>
          </SummaryCard>

          <SummaryCard 
            title="Filtered Catalog Count" 
            value={filteredProducts.length.toString()} 
            description={`Selected category: ${selectedCategory}`}
          >
            <span className="text-xs font-semibold text-sky-700 bg-sky-100/80 px-3 py-1 rounded-full border border-sky-300">
              ⚡ Live Filter View
            </span>
          </SummaryCard>

          <SummaryCard 
            title="System Architecture" 
            value="Optimal" 
            description="Verified Component Unidirectional Flow"
          >
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300">
              100% Validated
            </span>
          </SummaryCard>
        </section>

        {/* === CONTROLLED FORM WITH VOICE SYNTHESIS === */}
        <section className="bg-white/90 backdrop-blur-2xl p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Add New Inventory Product</h3>
              <p className="text-xs text-slate-500">Add items and hear automatic voice confirmation</p>
            </div>
            <span className="text-xs bg-sky-50 text-sky-700 border border-sky-200 font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
              <span>🔊</span> Speech Synthesis Ready
            </span>
          </div>
          
          {formError && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-2xl font-semibold flex items-center gap-2">
              {formError}
            </div>
          )}

          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Product Name Input */}
            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Product Name</label>
              <input 
                type="text" 
                placeholder="e.g. Smart Watch" 
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                className="w-full border border-slate-300/80 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 bg-slate-50/50 focus:bg-white"
              />
            </div>

            {/* Price Input */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Price ($ USD)</label>
              <input 
                type="number" 
                placeholder="Price ($)" 
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                className="w-full border border-slate-300/80 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 bg-slate-50/50 focus:bg-white"
              />
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Select Category</label>
              <select
                value={newProductCategory}
                onChange={(e) => setNewProductCategory(e.target.value)}
                className="w-full border border-slate-300/80 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 bg-slate-50/50 focus:bg-white text-slate-800 font-semibold cursor-pointer"
              >
                <option value="Electronics">Electronics</option>
                <option value="Computers">Computers</option>
                <option value="Accessories">Accessories</option>
                <option value="General">General</option>
              </select>
            </div>

            {/* Add Button */}
            <div className="md:col-span-2 flex items-end">
              <button 
                type="submit" 
                className="w-full bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold py-3 px-6 rounded-2xl text-sm transition-all shadow-md shadow-sky-600/20 hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>+</span> Add Item
              </button>
            </div>
          </form>
        </section>

        {/* === PRODUCT CATALOG & FILTER BAR === */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Product Catalog</h3>
              <p className="text-xs text-slate-500">Real-time inventory view filtered by category</p>
            </div>
            
            <div className="flex items-center space-x-3 text-sm bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200">
              <span className="text-slate-600 font-extrabold text-xs uppercase tracking-widest pl-3">Filter View:</span>
              <select 
                value={selectedCategory} 
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  speakText(`Showing ${e.target.value}`);
                }}
                className="border border-slate-300 rounded-xl px-4 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold text-slate-800 cursor-pointer shadow-sm"
              >
                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Computers">Computers</option>
                <option value="Accessories">Accessories</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="p-16 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-500 space-y-3">
              <div className="text-4xl">📦</div>
              <p className="font-bold text-slate-800 text-base">No items found</p>
              <p className="text-xs max-w-sm mx-auto">There are currently no inventory products under "{selectedCategory}".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="relative group transition-all duration-300 hover:-translate-y-1">
                  <ProductCard 
                    name={product.name}
                    price={product.price}
                    category={product.category}
                    status={product.status}
                  />
                  <button 
                    onClick={() => handleDeleteProduct(product.id, product.name)}
                    className="absolute top-4 right-4 text-xs bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 px-3 py-1 rounded-full font-bold transition-all opacity-0 group-hover:opacity-100 border border-slate-200"
                    title="Remove item"
                  >
                    ✕ Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}