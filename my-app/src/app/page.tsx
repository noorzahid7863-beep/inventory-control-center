// Helper Navbar Component
function Navbar({ title, userName }: { title: string; userName: string }) {
  return (
    <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold text-sky-400">{title}</h1>
      <div className="flex items-center space-x-3">
        <span className="text-sm text-slate-300">Welcome, <strong className="text-white">{userName}</strong></span>
        <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center font-bold text-slate-900">
          {userName.charAt(0)}
        </div>
      </div>
    </header>
  );
}

import SummaryCard from "../components/SummaryCard";
import ProductCard from "../components/ProductCard";

export default function Page() {
  const dashboardData = {
    appName: "Inventory Mgmt System",
    user: "Noor Zahid",
    metrics: {
      totalProducts: "120",
      totalOrders: "45",
      revenue: "$15,000"
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar title={dashboardData.appName} userName={dashboardData.user} />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">React Core Dashboard</h2>
          <p className="text-slate-600 text-sm">Demonstrating JSX, Props, Children Prop, and Unidirectional Data Flow.</p>
        </section>

        {/* Summary Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <SummaryCard 
            title="Total Products" 
            value={dashboardData.metrics.totalProducts} 
            description="Active inventory catalog items"
          >
            <span className="text-xs font-medium text-emerald-600">↑ 12% increase this week</span>
          </SummaryCard>

          <SummaryCard 
            title="Total Orders" 
            value={dashboardData.metrics.totalOrders} 
            description="Processed orders for October"
          >
            <span className="text-xs font-medium text-sky-600">8 orders pending shipping</span>
          </SummaryCard>

          <SummaryCard 
            title="Revenue" 
            value={dashboardData.metrics.revenue} 
            description="Total gross earnings YTD"
          >
            <span className="text-xs font-medium text-emerald-600">Target reached 95%</span>
          </SummaryCard>
        </section>

        {/* Product Cards Section */}
        <section className="mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Featured Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProductCard name="iPhone 16 Pro" price={999} category="Electronics" status="In Stock" />
            <ProductCard name="MacBook Pro M3" price={1999} category="Computers" status="In Stock" />
            <ProductCard name="Samsung Galaxy S25" price={899} category="Electronics" status="Low Stock" />
            <ProductCard name="AirPods Pro" price={249} category="Accessories" status="In Stock" />
          </div>
        </section>
      </main>
    </div>
  );
}