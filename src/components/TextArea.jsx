export default function TextArea({ label, placeholder, value, onChange, rows = 4 }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all resize-none"
      />
    </div>
  );
}
