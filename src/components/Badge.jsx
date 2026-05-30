const types = {
  primary: "bg-purple-100 text-purple-700",
  success: "bg-emerald-100 text-emerald-700",
  danger: "bg-red-100 text-red-600",
  warning: "bg-yellow-100 text-yellow-700",
  secondary: "bg-gray-100 text-gray-600",
  info: "bg-blue-100 text-blue-700",
};

export default function Badge({ children, type = "primary" }) {
  return (
    <span className={`${types[type]} px-3 py-1 rounded-full text-xs font-semibold`}>
      {children}
    </span>
  );
}
