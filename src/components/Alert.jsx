import { useState } from "react";
import { MdClose, MdCheckCircle, MdError, MdWarning, MdInfo } from "react-icons/md";

const types = {
  success: { bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700", icon: <MdCheckCircle size={18} /> },
  danger:  { bg: "bg-red-50 border-red-200",         text: "text-red-600",     icon: <MdError size={18} /> },
  warning: { bg: "bg-yellow-50 border-yellow-200",   text: "text-yellow-700",  icon: <MdWarning size={18} /> },
  info:    { bg: "bg-blue-50 border-blue-200",        text: "text-blue-700",    icon: <MdInfo size={18} /> },
};

export default function Alert({ children, type = "info", dismissible = false }) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const style = types[type];
  return (
    <div className={`${style.bg} ${style.text} border rounded-xl px-4 py-3 flex items-start gap-3 text-sm`}>
      <span className="mt-0.5 shrink-0">{style.icon}</span>
      <span className="flex-1">{children}</span>
      {dismissible && (
        <button onClick={() => setVisible(false)} className="shrink-0 hover:opacity-70">
          <MdClose size={16} />
        </button>
      )}
    </div>
  );
}
