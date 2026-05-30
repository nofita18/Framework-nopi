const types = {
  primary: "bg-[#6344f2] hover:bg-[#5235d9] text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-700",
  success: "bg-emerald-500 hover:bg-emerald-600 text-white",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  warning: "bg-yellow-400 hover:bg-yellow-500 text-white",
  outline: "border border-[#6344f2] text-[#6344f2] hover:bg-purple-50",
};

export default function Button({ children, type = "primary", onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`${types[type]} px-4 py-2 rounded-xl text-sm font-medium transition-all ${className}`}
    >
      {children}
    </button>
  );
}
