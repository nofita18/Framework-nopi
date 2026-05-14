import { useState } from "react";
import { MdSearch, MdPerson } from "react-icons/md";

const customersData = [
  { id: 1, name: "Andi Wijaya",    email: "andi@email.com",    phone: "081234567890", totalOrders: 12, totalSpent: 360000, joined: "Jan 2026", status: "Aktif" },
  { id: 2, name: "Sari Dewi",      email: "sari@email.com",    phone: "082345678901", totalOrders: 8,  totalSpent: 192000, joined: "Feb 2026", status: "Aktif" },
  { id: 3, name: "Budi Santoso",   email: "budi@email.com",    phone: "083456789012", totalOrders: 5,  totalSpent: 175000, joined: "Mar 2026", status: "Aktif" },
  { id: 4, name: "Rina Marlina",   email: "rina@email.com",    phone: "084567890123", totalOrders: 15, totalSpent: 450000, joined: "Jan 2026", status: "Aktif" },
  { id: 5, name: "Hendra Putra",   email: "hendra@email.com",  phone: "085678901234", totalOrders: 3,  totalSpent: 90000,  joined: "Apr 2026", status: "Tidak Aktif" },
  { id: 6, name: "Dewi Lestari",   email: "dewi@email.com",    phone: "086789012345", totalOrders: 20, totalSpent: 700000, joined: "Des 2025", status: "Aktif" },
  { id: 7, name: "Fajar Nugroho",  email: "fajar@email.com",   phone: "087890123456", totalOrders: 7,  totalSpent: 350000, joined: "Feb 2026", status: "Aktif" },
  { id: 8, name: "Gita Purnama",   email: "gita@email.com",    phone: "088901234567", totalOrders: 11, totalSpent: 440000, joined: "Mar 2026", status: "Aktif" },
];

export default function Customers() {
  const [search, setSearch] = useState("");

  const filtered = customersData.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Pelanggan</h1>
        <p className="text-sm text-gray-500 mt-1">Daftar semua pelanggan Bersih.in</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 max-w-md">
          <MdSearch className="text-gray-400 shrink-0" size={18} />
          <input type="text" placeholder="Cari pelanggan..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none text-gray-600 w-full" />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((c) => (
          <div key={c.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0">
                <MdPerson size={24} className="text-blue-500" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-gray-800 truncate">{c.name}</p>
                <p className="text-xs text-gray-400 truncate">{c.email}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">No. HP</span>
                <span className="text-gray-700 font-medium">{c.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Pesanan</span>
                <span className="text-gray-700 font-medium">{c.totalOrders}x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Belanja</span>
                <span className="text-blue-600 font-bold">Rp {c.totalSpent.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Bergabung</span>
                <span className="text-gray-500 text-xs">{c.joined}</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                c.status === "Aktif" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
              }`}>
                {c.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
          <p className="text-4xl mb-2">👤</p>
          <p className="text-sm">Pelanggan tidak ditemukan</p>
        </div>
      )}
    </div>
  );
}
