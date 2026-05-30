export default function SelectField({ label, options = [], value, onChange, placeholder = "Pilih..." }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className="border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all"
      >
        <option value="">{placeholder}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    </div>
  );
}
