# 📦 Inventory Control Center — Advanced React 19 Engine

A modern, high-performance Inventory Control Center Dashboard built with Next.js 15 (React 19), TypeScript, Tailwind CSS, and Web APIs. Designed as part of **Week 4: Advanced React State & Architecture**, this application transitions basic state patterns into enterprise-grade React architecture utilizing memoization, custom hooks, global context, persistent browser state, and integrated Speech Synthesis feedback.

---

## ✨ Key Features

* **Advanced React State Architecture:** Powered by `useReducer` and the `React Context API` for centralized, clean action-based state management.
* **Custom Hooks & Reusable Logic:** Implemented dedicated custom hooks (`useInventoryAnalytics`, `useSpeech`) to encapsulate complex business logic and keep components clean and maintainable.
* **Performance Optimization (Hooks):** Integrated `useMemo` for real-time inventory queries/calculations and `useCallback` for stable event handler memoization.
* **Precision Focus Control:** Direct DOM access managed via `useRef` to auto-focus form inputs seamlessly after submit actions.
* **Real-Time Voice Synthesis (`useSpeech`):** Integrated Web Speech API providing instantaneous natural voice announcements when items are created or deleted.
* **LocalStorage State Persistence:** Automatic state syncing to browser storage to maintain data integrity across sessions.
* **Responsive Glassmorphic Layout:** Ultra-wide responsive full-screen architecture featuring dark mode gradient borders, dynamic category visuals, and responsive metric cards.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (Glassmorphic UI, Dark Gradients, Responsive Grid)
* **Hooks & Core APIs:** Custom Hooks (`useInventoryAnalytics`), `useReducer`, `useMemo`, `useCallback`, `useRef`, `useContext`, `useEffect`
* **Browser APIs:** Web Speech Synthesis API (`window.speechSynthesis`), `localStorage`

---

## 📂 Project Structure

```text
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
│   │   └── ExternalApiFeed.tsx# External Supplier Data Stream Feed Component
│   ├── context/
│   │   └── InventoryContext.tsx # React Context API Provider & Custom Hook
│   └── hooks/
│       ├── useInventoryAnalytics.ts # Custom Hook for Reusable Analytics
│       └── useSpeech.ts       # Speech Synthesis Web API Abstraction
├── package.json
└── README.md                  # Project Documentation & Architecture Overview