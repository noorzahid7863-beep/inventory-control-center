# 📦 Inventory Control Center — Advanced React 16 Engine

A modern, high-performance Inventory Control Center Dashboard built with Next.js 16 (React 19), TypeScript, Tailwind CSS, and Web APIs. Designed as part of Week 4: Advanced React State & Architecture, this application transitions basic state patterns into enterprise-grade React architecture utilizing memoization, global context, persistent browser state, and integrated Speech Synthesis feedback.

## 🚀 Key Features

* ⚡ **Advanced React State Architecture:** Powered by `useReducer` and the `React Context API` for centralized, clean action-based state management.
* 🔊 **Real-Time Voice Synthesis (`useSpeech`):** Integrated Web Speech API providing instantaneous natural voice announcements when items are created, modified, or removed.
* 🔍 **Optimized Dynamic Filtering:** Utilizing `useMemo` for high-performance search execution across real-time inventory queries and category filters without unnecessary component re-renders.
* 💾 **LocalStorage State Persistence:** Automatic state syncing to browser storage to maintain data integrity across sessions.
* 🎯 **Precision Focus Control:** Direct DOM access managed via `useRef` to auto-focus form inputs seamlessly after operations.
* responsive Glassmorphic Layout: Ultra-wide responsive full-screen architecture (`max-w-[1800px]`) featuring dark mode gradient borders, dynamic category visuals, and responsive metric cards.

## 🛠️ Tech Stack & Architecture

* **Framework:** Next.js 16 (App Router)[cite: 6]
* **Language:** TypeScript[cite: 6]
* **Styling:** Tailwind CSS (Glassmorphic UI, Dark Gradients, Responsive Grid)[cite: 6]
* **Hooks & Core APIs:** `useReducer`, `useMemo`, `useCallback`, `useRef`, `useContext`, `useEffect`[cite: 6]
* **Browser APIs:** Web Speech Synthesis API (`window.speechSynthesis`), `localStorage`[cite: 6]

## 📁 Project Structure

my-app/
├── src/
│   ├── app/
│   │   ├── error.tsx          # Error Boundary Fallback UI
│   │   ├── page.tsx           # Main Master Control Dashboard View
│   │   ├── layout.tsx         # Root Application Layout & Font Providers
│   │   ├── globals.css        # Custom Utilities & Glassmorphism Rules
│   │   └── providers.tsx      # Providers Wrapper
│   ├── components/
│   │   ├── Navbar.tsx         # Application Navigation Header
│   │   ├── ProductCard.tsx    # Modular Product Card Display
│   │   ├── SummaryCard.tsx    # Metric Summary Card Component
│   │   └── ExternalApiFeed.tsx# TanStack Query External Feed Component
│   ├── context/
│   │   └── InventoryContext.tsx # React Context API Provider & Custom Hook
│   └── hooks/
│       └── useSpeech.ts       # Speech Synthesis Web API Abstraction
├── package.json
└── README.md                  # Project Documentation & Architecture Overview