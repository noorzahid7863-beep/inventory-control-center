# Inventory Control Center — Advanced React 16 Engine

A modern, high-performance Inventory Control Center Dashboard built with Next.js 16, TypeScript, Tailwind CSS, and TanStack Query. Designed as part of **Week 4: Advanced React State & Architecture**, this application transitions basic state patterns into enterprise-grade React architecture utilizing `useReducer`, custom hooks, global context, persistent browser state, TanStack Query server state, and integrated Speech Synthesis feedback.

## 🔑 Key Features

* **Advanced React State Architecture:** Powered by `useReducer` and the `React Context API` for centralized, clean action-based state management.
* **Server State Management (TanStack Query):** Integrated external supplier data streams with robust caching and background synchronization.
* **Custom Hooks & Reusable Logic:** Implemented dedicated custom hooks (`useInventoryAnalytics`, `useSpeech`) to encapsulate complex business logic and keep components clean and maintainable.
* **Performance Optimization (Hooks):** Utilized `useMemo` for real-time inventory queries/calculations and `useCallback` for stable event handler memoization[cite: 9].
* **Precision Focus Control:** Direct DOM access managed via `useRef` to auto focus form inputs seamlessly after submit actions[cite: 9].
* **Real-Time Voice Synthesis (`useSpeech`):** Integrated Web Speech API providing instantaneous natural voice announcements when items are created or deleted[cite: 9].
* **LocalStorage State Persistence:** Automatic state syncing to browser storage to maintain data integrity across sessions[cite: 9].
* **Responsive Glassmorphic Layout:** Ultra wide responsive full screen architecture featuring dark mode gradient borders, dynamic category visuals, and responsive metric cards[cite: 9].

## 🛠 Tech Stack & Architecture

* **Framework:** Next.js 16 (App Router)[cite: 9]
* **Language:** TypeScript[cite: 9]
* **Styling:** Tailwind CSS (Glassmorphic UI, Dark Gradients, Responsive Grid)[cite: 9]
* **State Management:** React `useReducer`, `React Context API`, TanStack Query (Server State)[cite: 9]
* **Hooks & Core APIs:** Custom Hooks (`useInventoryAnalytics`), `useMemo`, `useCallback`, `useRef`, `useContext`, `useEffect`[cite: 9]
* **Browser APIs:** Web Speech Synthesis API (`window.speechSynthesis`), `localStorage`[cite: 9]

## 📂 Project Structure

```text
my-app/
├── src/
│   ├── app/
│   │   ├── error.tsx              # Error Boundary Fallback UI
│   │   ├── page.tsx               # Main Master Control Dashboard View
│   │   ├── layout.tsx             # Root Application Layout & Font Providers
│   │   ├── globals.css            # Custom Utilities & Glassmorphism Rules
│   │   └── providers.tsx          # Providers Wrapper
│   ├── components/
│   │   ├── Navbar.tsx             # Application Navigation Header
│   │   ├── ProductCard.tsx        # Modular Product Card Display
│   │   ├── SummaryCard.tsx        # Metric Summary Card Component
│   │   └── ExternalApiFeed.tsx    # External Supplier Data Stream Feed Component
│   └── context/
│       └── InventoryContext.tsx   # React Context API Provider, useReducer & Custom Hook
└── package.json                   # Project Dependencies & Architecture Overview