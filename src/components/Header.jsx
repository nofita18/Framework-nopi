import { MdNotifications, MdSearch, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  // Ambil data user dari localStorage
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const displayName = user?.name ?? user?.email ?? "Admin";
  const initials = displayName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-gray-800">LaundryPro</h2>
        <p className="text-xs text-gray-400">Laundry Management System</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2">
          <MdSearch className="text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Cari..."
            className="bg-transparent text-sm outline-none text-gray-600 w-40"
          />
        </div>

        <button className="relative p-2 rounded-xl bg-gray-100 hover:bg-blue-100 transition">
          <MdNotifications size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#7c4dff] flex items-center justify-center text-white font-bold text-sm">
            {initials}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-700 max-w-[120px] truncate">
              {displayName}
            </p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          title="Keluar"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-500 transition"
        >
          <MdLogout size={18} />
          <span className="hidden md:inline">Keluar</span>
        </button>
      </div>
    </header>
  );
}
