import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdLocalLaundryService,
  MdPeople,
  MdReceiptLong,
  MdLogout,
  MdSettings,
  MdWidgets,
} from "react-icons/md";

const navItems = [
  {
    to: "/",
    label: "Dashboard",
    icon: <MdDashboard size={20} />,
    end: true,
  },
  {
    to: "/orders",
    label: "Pesanan",
    icon: <MdReceiptLong size={20} />,
    end: false,
  },
  {
    to: "/services",
    label: "Layanan",
    icon: <MdLocalLaundryService size={20} />,
    end: false,
  },
  {
    to: "/customers",
    label: "Pelanggan",
    icon: <MdPeople size={20} />,
    end: false,
  },
  {
    to: "/components",
    label: "Components",
    icon: <MdWidgets size={20} />,
    end: false,
  },
];

const menuClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
    isActive
      ? "bg-purple-100 text-purple-600"
      : "text-gray-600 hover:bg-gray-100"
  }`;

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#f7f7f7] border-r border-gray-200 flex flex-col px-4 py-5">
      
      {/* Logo */}
      <div className="flex items-center gap-3 px-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
          <MdLocalLaundryService size={22} className="text-white" />
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-800">
            LaundryPro
          </h1>

          <p className="text-xs text-gray-400">
            Laundry System
          </p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={menuClass}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}

        {/* Settings */}
        <NavLink
          to="/settings"
          className={menuClass}
        >
          <MdSettings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="pt-5 border-t border-gray-200">
        <NavLink
          to="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-100 hover:text-red-500 transition"
        >
          <MdLogout size={20} />
          Keluar
        </NavLink>
      </div>
    </aside>
    
  );
}