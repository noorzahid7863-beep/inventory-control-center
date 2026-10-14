export default function ProductCard({ name, price, category, status }) {
  return (
    <div className="bg-white p-5 rounded-lg border border-slate-200 flex justify-between items-center">
      <div>
        <h4 className="font-bold text-slate-800">{name}</h4>
        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{category}</span>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-sky-600">${price}</p>
        <span className={`text-xs font-semibold ${status === 'In Stock' ? 'text-emerald-600' : 'text-amber-600'}`}>
          {status}
        </span>
      </div>
    </div>
  );
}