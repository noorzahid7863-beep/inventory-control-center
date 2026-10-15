# 📦 Inventory Master Dashboard — React Core Concepts (3-Day Complete)

A high-performance, aesthetically professional Inventory Management Dashboard built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**. This repository serves as the official capstone project for the **React Core Concepts (3-Day Roadmap)**, demonstrating clean component composition, state management, lifecycle hooks, controlled forms, conditional rendering, and browser Web Speech API voice synthesis.

---

## 🌟 Key Features & Implementation Breakdown

### 1. **Day 1: Component Architecture & Props**
* **Modular Components:** Divided into clean sub-components including `Navbar`, `SummaryCard`, and `ProductCard`.
* **Prop Passing & Children Prop:** Demonstrates unidirectional data flow, custom layout children injection, and strong TypeScript interfaces.
* **Saas UI Design:** Modern glassmorphism card layouts, hover responsiveness, and clean typography.

### 2. **Day 2: State Management & Interactivity**
* **`useState` Integration:** Reactive state updates for total inventory items, filtering categories, and real-time product list management.
* **Interactive Dynamic Catalog:** Ability to dynamically add new products and remove existing items live without page reload.
* **Controlled Forms:** Form inputs bound directly to React state variables.

### 3. **Day 3: Lifecycle, Validation & Voice Engine**
* **`useEffect` Lifecycle Hook:** Real-time system clock updating every second with automatic cleanup intervals.
* **Form Validation:** Real-time error handling with voice-assisted alerts for empty product names or invalid prices.
* **Conditional Filtering:** Dynamic view filtering by categories (*All, Electronics, Computers, Accessories, General*).
* **Web Speech API:** Browser native Text-to-Speech voice feedback when adding/removing items or triggering validation errors.

---

## 🛠️ Tech Stack & Dependencies

* **Framework:** Next.js (App Router)
* **Library:** React 19
* **Language:** TypeScript
* **Styling:** Tailwind CSS (Glassmorphism, Gradient Grids, Custom Animations)
* **Voice Engine:** Web Speech API (`window.speechSynthesis`)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) installed on your machine.

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/my-app.git](https://github.com/your-username/my-app.git)
   cd my-app