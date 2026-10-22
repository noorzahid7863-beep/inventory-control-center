"use client";

import React, { useState, useRef, useMemo, useCallback } from "react";

interface Item {
  id: number;
  name: string;
  price: number;
}

export default function AdvancedHooksDemo() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Mouse", price: 25 },
    { id: 3, name: "Keyboard", price: 75 },
  ]);

  const [nameInput, setNameInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  // 1. useRef: Input field par direct focus ke liye
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleFocusInput = () => {
    nameInputRef.current?.focus();
  };

  // 2. useCallback: Function ko re-creation se bachane ke liye
  const handleRemoveItem = useCallback((id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput || !priceInput) return;

    const newItem: Item = {
      id: Date.now(),
      name: nameInput,
      price: Number(priceInput),
    };

    setItems((prev) => [...prev, newItem]);
    setNameInput("");
    setPriceInput("");
    nameInputRef.current?.focus();
  };

  // 3. useMemo: Calculation ko memoize karne ke liye
  const totalValuation = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800 my-6">
      <h2 className="text-xl font-bold mb-4 text-blue-400">
        Week 4 Day 1: Advanced Hooks Demo (useRef, useMemo, useCallback)
      </h2>

      {/* useRef Demo */}
      <div className="mb-6">
        <button
          onClick={handleFocusInput}
          type="button"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition"
        >
          🎯 Focus Name Input (useRef)
        </button>
      </div>

      {/* Add Item Form */}
      <form onSubmit={handleAddItem} className="flex gap-3 mb-6">
        <input
          ref={nameInputRef}
          type="text"
          placeholder="Item Name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-white"
        />
        <input
          type="number"
          placeholder="Price"
          value={priceInput}
          onChange={(e) => setPriceInput(e.target.value)}
          className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-28 text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-medium transition"
        >
          Add Item
        </button>
      </form>

      {/* useMemo Demo */}
      <div className="p-3 bg-slate-800 rounded-lg mb-4 flex justify-between items-center border border-slate-700">
        <span className="text-sm font-semibold text-gray-300">
          Total Valuation (useMemo):
        </span>
        <span className="text-lg font-bold text-green-400">
          ${totalValuation}
        </span>
      </div>

      {/* useCallback Demo */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Item List:</h3>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-slate-800/60 px-4 py-2 rounded-lg border border-slate-700/50"
          >
            <span>
              {item.name} - <strong className="text-blue-300">${item.price}</strong>
            </span>
            <button
              onClick={() => handleRemoveItem(item.id)}
              type="button"
              className="text-xs px-2 py-1 bg-red-600/80 hover:bg-red-500 rounded text-white transition"
            >
              Delete (useCallback)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}