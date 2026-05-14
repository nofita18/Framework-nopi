export default function SelectDropdown({ label, options, value, onChange, error, required }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none
          ${error ? 'border-red-500' : 'border-gray-300'}`}
      >
        <option value="">Pilih {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}