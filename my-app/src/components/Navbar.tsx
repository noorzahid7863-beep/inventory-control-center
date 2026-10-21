'use client';

import { useState, useEffect } from 'react';

interface NavbarProps {
  title?: string;
  userName?: string;
}

export default function Navbar({ 
  title = 'Inventory Control Center', 
  userName = 'User' 
}: NavbarProps) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());

    // Live Clock Interval
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Proper Cleanup Phase (Memory leak prevention)
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md rounded-xl mb-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-sky-400">{title}</h1>
        {/* Live Clock Display with Cleanup */}
        <span className="text-xs font-mono bg-slate-800 text-slate-300 px-3 py-1 rounded-md border border-slate-700">
          🕒 {time ? time.toLocaleTimeString() : 'Loading...'}
        </span>
      </div>

      <div className="flex items-center space-x-3">
        <span className="text-sm text-slate-300">
          Welcome, <strong className="text-white">{userName}</strong>
        </span>
        <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center font-bold text-slate-900 uppercase">
          {userName ? userName.charAt(0) : 'U'}
        </div>
      </div>
    </header>
  );
}