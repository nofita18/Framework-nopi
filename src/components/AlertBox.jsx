// Komponen reusable alert — sesuai materi Pertemuan 13
export default function AlertBox({ type = "info", children }) {
  const baseClass =
    "px-4 py-3 rounded-2xl mb-4 shadow-sm border text-sm flex items-start gap-2";

  const styles = {
    success: "bg-green-50 border-green-300 text-green-700",
    error:   "bg-red-50 border-red-300 text-red-700",
    info:    "bg-blue-50 border-blue-300 text-blue-700",
    warning: "bg-yellow-50 border-yellow-300 text-yellow-700",
  };

  const icons = {
    success: "✅",
    error:   "❌",
    info:    "ℹ️",
    warning: "⚠️",
  };

  return (
    <div className={`${baseClass} ${styles[type] ?? styles.info}`}>
      <span>{icons[type] ?? "ℹ️"}</span>
      <span>{children}</span>
    </div>
  );
}
