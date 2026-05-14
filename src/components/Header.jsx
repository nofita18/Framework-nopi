import { MdNotifications, MdSearch } from "react-icons/md";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">LaundryPro</h2>
        <p className="text-xs text-gray-400">Laundry Management System</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2">
          <MdSearch className="text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Cari..."
            className="bg-transparent text-sm outline-none text-gray-600 w-40"
          />
        </div>

        {/* Notif */}
        <button className="relative p-2 rounded-xl bg-gray-100 hover:bg-blue-100 transition">
          <MdNotifications size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-700">Admin</p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
