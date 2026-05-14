import { MdLocalLaundryService, MdReceiptLong, MdPeople, MdAttachMoney } from "react-icons/md";
import laundryData from "../data/laundry_services.json";

const stats = [
  { label: "Total Pesanan", value: "1,284", change: "+12% bulan ini", icon: <MdReceiptLong size={22} />, light: "bg-blue-50 text-blue-600" },
  { label: "Layanan Aktif", value: "12", change: "Semua tersedia", icon: <MdLocalLaundryService size={22} />, light: "bg-emerald-50 text-emerald-600" },
  { label: "Total Pelanggan", value: "348", change: "+8 pelanggan baru", icon: <MdPeople size={22} />, light: "bg-violet-50 text-violet-600" },
  { label: "Pendapatan", value: "Rp 8,4 Jt", change: "+5% dari kemarin", icon: <MdAttachMoney size={22} />, light: "bg-amber-50 text-amber-600" },
];

const recentOrders = [
  { id: "#L001", customer: "Andi Wijaya",  service: "Cuci + Setrika", weight: "3 kg",    status: "Selesai",  date: "14 Mei 2026" },
  { id: "#L002", customer: "Sari Dewi",    service: "Cuci Express",   weight: "2 kg",    status: "Diproses", date: "14 Mei 2026" },
  { id: "#L003", customer: "Budi Santoso", service: "Dry Cleaning",   weight: "1 item",  status: "Menunggu", date: "13 Mei 2026" },
  { id: "#L004", customer: "Rina Marlina", service: "Cuci Sepatu",    weight: "1 pasang",status: "Selesai",  date: "13 Mei 2026" },
  { id: "#L005", customer: "Hendra Putra", service: "Cuci Karpet",    weight: "4 m²",    status: "Diproses", date: "12 Mei 2026" },
];

const statusStyle = {
  Selesai:  "bg-green-100 text-green-700",
  Diproses: "bg-blue-100 text-blue-700",
  Menunggu: "bg-yellow-100 text-yellow-700",
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Selamat datang kembali, Admin! Berikut ringkasan hari ini.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${s.light} flex items-center justify-center shrink-0`}>
              {s.icon}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              <p className="text-xl font-bold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders + Top Services */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-bold text-gray-800 mb-4">Pesanan Terbaru</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 text-xs border-b border-gray-100">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Pelanggan</th>
                  <th className="pb-3 font-medium">Layanan</th>
                  <th className="pb-3 font-medium">Berat</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50 transition">
                    <td className="py-3 font-mono text-blue-600 font-semibold">{o.id}</td>
                    <td className="py-3 text-gray-700">{o.customer}</td>
                    <td className="py-3 text-gray-600">{o.service}</td>
                    <td className="py-3 text-gray-500">{o.weight}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[o.status]}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Services */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-bold text-gray-800 mb-4">Layanan Populer</h3>
          <div className="space-y-3">
            {laundryData.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-700 truncate">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.category}</p>
                </div>
                <p className="text-sm font-bold text-blue-600 shrink-0">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
