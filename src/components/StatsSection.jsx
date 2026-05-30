export default function StatsSection({ stats = [] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
            {s.icon}
          </div>
          <p className="text-2xl font-bold text-gray-800">{s.value}</p>
          <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          {s.change && (
            <span className={`text-[10px] font-bold mt-1 inline-block ${s.up ? "text-emerald-500" : "text-red-500"}`}>
              {s.up ? "▲" : "▼"} {s.change}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
