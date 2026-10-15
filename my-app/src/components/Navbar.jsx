export default function Navbar({ title, userName }) {
  return (
    <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold text-sky-400">{title}</h1>
      <div className="flex items-center space-x-3">
        <span className="text-sm text-slate-300">
          Welcome, <strong className="text-white">{userName}</strong>
        </span>
        <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center font-bold text-slate-900">
          {userName ? userName.charAt(0) : 'U'}
        </div>
      </div>
    </header>
  );
}