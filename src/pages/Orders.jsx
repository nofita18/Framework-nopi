import { useState } from "react";
import { MdSearch } from "react-icons/md";

const ordersData = [
  { id: "#L001", customer: "Andi Wijaya",    phone: "081234567890", service: "Cuci + Setrika", weight: "3 kg",    total: 30000,  status: "Selesai",  date: "14 Mei 2026" },
  { id: "#L002", customer: "Sari Dewi",      phone: "082345678901", service: "Cuci Express",   weight: "2 kg",    total: 24000,  status: "Diproses", date: "14 Mei 2026" },
  { id: "#L003", customer: "Budi Santoso",   phone: "083456789012", service: "Dry Cleaning",   weight: "1 item",  total: 35000,  status: "Menunggu", date: "13 Mei 2026" },
  { id: "#L004", customer: "Rina Marlina",   phone: "084567890123", service: "Cuci Sepatu",    weight: "1 pasang",total: 25000,  status: "Selesai",  date: "13 Mei 2026" },
  { id: "#L005", customer: "Hendra Putra",   phone: "085678901234", service: "Cuci Karpet",    weight: "4 m²",    total: 60000,  status: "Diproses", date: "12 Mei 2026" },
  { id: "#L006", customer: "Dewi Lestari",   phone: "086789012345", service: "Cuci Reguler",   weight: "5 kg",    total: 35000,  status: "Selesai",  date: "12 Mei 2026" },
  { id: "#L007", customer: "Fajar Nugroho",  phone: "087890123456", service: "Cuci Tas",       weight: "1 item",  total: 50000,  status: "Menunggu", date: "11 Mei 2026" },
  { id: "#L008", customer: "Gita Purnama",   phone: "088901234567", service: "Cuci Boneka",    weight: "2 item",  total: 40000,  status: "Selesai",  date: "11 Mei 2026" },
  { id: "#L009", customer: "Irwan Setiawan", phone: "089012345678", service: "Cuci Bed Cover", weight: "1 item",  total: 30000,  status: "Diproses", date: "10 Mei 2026" },
  { id: "#L010", customer: "Jeni Kusuma",    phone: "081123456789", service: "Cuci Jas",       weight: "1 item",  total: 40000,  status: "Selesai",  date: "10 Mei 2026" },
];

const statusStyle = {
  Selesai:  "bg-green-100 text-green-700",
  Diproses: "bg-blue-100 text-blue-700",
  Menunggu: "bg-yellow-100 text-yellow-700",
};

export default function Orders() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filtered = ordersData.filter((o) => {
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.service.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus ? o.status === filterStatus : true;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Pesanan</h1>
        <p className="text-sm text-gray-500 mt-1">Kelola semua pesanan laundry pelanggan</p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
          <MdSearch className="text-gray-400 shrink-0" size={18} />
          <input type="text" placeholder="Cari pesanan, pelanggan..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none text-gray-600 w-full" />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 outline-none">
          <option value="">Semua Status</option>
          <option value="Selesai">Selesai</option>
          <option value="Diproses">Diproses</option>
          <option value="Menunggu">Menunggu</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-left text-gray-500 text-xs">
                <th className="px-5 py-4 font-semibold">ID Pesanan</th>
                <th className="px-5 py-4 font-semibold">Pelanggan</th>
                <th className="px-5 py-4 font-semibold">Layanan</th>
                <th className="px-5 py-4 font-semibold">Berat/Qty</th>
                <th className="px-5 py-4 font-semibold">Total</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-4 font-mono font-semibold text-blue-600">{o.id}</td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-800">{o.customer}</p>
                    <p className="text-xs text-gray-400">{o.phone}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{o.service}</td>
                  <td className="px-5 py-4 text-gray-500">{o.weight}</td>
                  <td className="px-5 py-4 font-semibold text-gray-800">Rp {o.total.toLocaleString("id-ID")}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-xs">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-2">🔍</p>
            <p className="text-sm">Tidak ada pesanan ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
