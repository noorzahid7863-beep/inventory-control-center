'use client';

import React, { useState, useReducer, useRef, useMemo, useCallback, createContext, useContext, useEffect } from 'react';

// --- Types ---
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl?: string;
}

type Action =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_PRODUCT'; payload: Omit<Product, 'id'> }
  | { type: 'DELETE_PRODUCT'; payload: string };

interface InventoryContextType {
  products: Product[];
  dispatch: React.Dispatch<Action>;
  speak: (text: string) => void;
}

// Helper to get image/emoji based on product name
const getProductImage = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('laptop') || lowerName.includes('computer') || lowerName.includes('macbook')) {
    return '💻';
  } else if (lowerName.includes('mouse')) {
    return '🖱️';
  } else if (lowerName.includes('keyboard')) {
    return '⌨️';
  } else if (lowerName.includes('monitor') || lowerName.includes('screen') || lowerName.includes('display')) {
    return '🖥️';
  } else if (lowerName.includes('phone') || lowerName.includes('mobile') || lowerName.includes('iphone')) {
    return '📱';
  } else if (lowerName.includes('headphone') || lowerName.includes('headset') || lowerName.includes('audio')) {
    return '🎧';
  } else if (lowerName.includes('chair') || lowerName.includes('desk')) {
    return '🪑';
  } else if (lowerName.includes('camera')) {
    return '📷';
  }
  return '📦';
};

// --- Custom Hook for Speech Synthesis ---
const useSpeech = () => {
  const speak = useCallback((text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return { speak };
};

// --- Context ---
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) throw new Error('useInventory must be used within InventoryProvider');
  return context;
};

// --- Initial Mock Data ---
const initialProducts: Product[] = [
  { id: '1', name: 'Laptop Pro Max', category: 'Electronics', price: 1200 },
  { id: '2', name: 'Wireless Mouse', category: 'Accessories', price: 25 },
  { id: '3', name: 'Gaming Keyboard', category: 'Accessories', price: 75 },
  { id: '4', name: '27-inch Monitor', category: 'Electronics', price: 300 },
];

function inventoryReducer(state: Product[], action: Action): Product[] {
  let newState: Product[];
  switch (action.type) {
    case 'SET_PRODUCTS':
      return action.payload;
    case 'ADD_PRODUCT':
      newState = [
        { ...action.payload, id: Date.now().toString() },
        ...state,
      ];
      break;
    case 'DELETE_PRODUCT':
      newState = state.filter((p) => p.id !== action.payload);
      break;
    default:
      return state;
  }

  // LocalStorage save
  if (typeof window !== 'undefined') {
    localStorage.setItem('inventory_items', JSON.stringify(newState));
  }
  return newState;
}

// --- Component: Header ---
const Header = () => (
  <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-slate-800/80 gap-4">
    <div>
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30 font-mono text-xs uppercase tracking-wider font-semibold">
          Week 4 Engine
        </span>
        <span className="text-emerald-400 text-xs font-semibold flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Voice & Auto-Storage Active
        </span>
      </div>
      <h1 className="text-3xl lg:text-5xl font-black text-white mt-3 tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
        Inventory Control Center
      </h1>
      <p className="text-slate-400 text-base mt-1">
        Real-time item creation with Voice Alerts, Persistent Storage & Auto Visual Preview
      </p>
    </div>
    <div className="flex items-center gap-4 bg-slate-900/90 p-3 rounded-2xl border border-slate-800 shadow-xl">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-blue-500/25">
        NZ
      </div>
      <div className="pr-3">
        <p className="text-xs text-slate-400 font-medium">Engineer Account</p>
        <p className="text-base font-bold text-slate-100">Noor Zahid</p>
      </div>
    </div>
  </header>
);

// --- Component: Stat Card ---
const StatCard = ({ title, value, color, icon, subtitle }: { title: string; value: number | string; color: string; icon: string; subtitle: string }) => (
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

// --- Component: Add Product Form ---
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

    // Voice announcement
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
          <label className="block text-xs font-semibold text-slate-400 mb-2">Item Name (Try "Laptop")</label>
          <input
            ref={nameInputRef}
            type="text"
            placeholder="Type e.g. Gaming Laptop..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all text-sm font-medium"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all text-sm font-medium"
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
            className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all text-sm font-medium"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full h-[50px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-200 shadow-xl shadow-blue-600/30 active:scale-[0.98] text-sm flex items-center justify-center gap-2"
          >
            <span className="text-lg">＋</span> Add to Inventory
          </button>
        </div>
      </form>
    </div>
  );
};

// --- Main Dashboard Logic ---
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

  const categoriesCount = useMemo(() => {
    return new Set(products.map((p) => p.category)).size;
  }, [products]);

  const totalValue = useMemo(() => {
    return products.reduce((acc, p) => acc + p.price, 0);
  }, [products]);

  const handleDelete = useCallback((id: string, name: string) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
    speak(`Removed ${name} from inventory.`);
  }, [dispatch, speak]);

  return (
    <div className="space-y-8">
      <Header />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Products" value={products.length} color="bg-blue-500" icon="📦" subtitle="Items in storage" />
        <StatCard title="Filtered View" value={filteredProducts.length} color="bg-indigo-500" icon="🔍" subtitle="Matching items" />
        <StatCard title="Categories" value={categoriesCount} color="bg-emerald-500" icon="🏷️" subtitle="Divisions" />
        <StatCard title="Total Valuation" value={`$${totalValue}`} color="bg-purple-500" icon="💎" subtitle="Calculated sum" />
      </div>

      {/* Form */}
      <AddProductForm />

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/60 p-5 rounded-2xl border border-slate-800/90 shadow-xl">
        <div className="w-full md:w-1/2 relative">
          <input
            type="text"
            placeholder="Search items by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950/90 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm font-medium"
          />
          <span className="absolute left-4 top-3.5 text-slate-500 text-base">🔍</span>
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {['All', 'Electronics', 'Accessories', 'General'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30'
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[300px]">
        {filteredProducts.map((product) => {
          const visualIcon = getProductImage(product.name);
          return (
            <div
              key={product.id}
              className="group relative bg-slate-900/70 backdrop-blur-xl p-6 rounded-2xl border border-slate-800/90 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-lg bg-slate-800 text-blue-400 border border-slate-700/60 shadow-inner">
                    {product.category}
                  </span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">
                    ${product.price}
                  </span>
                </div>

                {/* Visual Preview Banner */}
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
                  onClick={() => handleDelete(product.id, product.name)}
                  className="text-xs font-bold text-rose-400 hover:text-rose-200 bg-rose-500/10 hover:bg-rose-500/20 px-4 py-2 rounded-xl border border-rose-500/20 transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <span>🗑️</span> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800">
          <p className="text-slate-400 text-base font-medium">No inventory items found.</p>
        </div>
      )}
    </div>
  );
};

// --- Root Component ---
export default function Page() {
  const [products, dispatch] = useReducer(inventoryReducer, initialProducts);
  const { speak } = useSpeech();

  // Load from LocalStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('inventory_items');
      if (saved) {
        try {
          dispatch({ type: 'SET_PRODUCTS', payload: JSON.parse(saved) });
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  return (
    <InventoryContext.Provider value={{ products, dispatch, speak }}>
      <main className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 lg:p-12 font-sans selection:bg-blue-500 selection:text-white">
        <div className="w-full max-w-[1800px] mx-auto space-y-8">
          <DashboardContent />
        </div>
      </main>
    </InventoryContext.Provider>
  );
}