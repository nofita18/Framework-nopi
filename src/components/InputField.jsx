export default function InputField({ label, type = "text", placeholder, value, onChange, icon }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus-within:ring-2 focus-within:ring-purple-200 focus-within:border-purple-400 transition-all">
        {icon && <span className="text-gray-400 shrink-0">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="bg-transparent text-sm outline-none text-gray-700 w-full placeholder-gray-400"
        />
      </div>
    </div>
  );
}
