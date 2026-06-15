import {
  MdPeople,
  MdPersonAdd,
  MdPayments,
  MdWarning,
  MdStar,
  MdLocalOffer,
  MdReceiptLong,
  MdChevronLeft,
  MdChevronRight,
  MdMoreVert,
  MdCalendarToday,
  MdTrendingUp,
  MdCampaign,
  MdSupportAgent,
} from "react-icons/md";

import PageHeader   from "../components/PageHeader";
import Container    from "../components/Container";
import StatsSection from "../components/StatsSection";
import Card         from "../components/Card";
import Badge        from "../components/Badge";
import Avatar       from "../components/Avatar";
import { dashboardSummary, orders, complaints, customerSources } from "../data/crmData";

const statsData = [
  { label: "Total Pelanggan",   value: String(dashboardSummary.totalCustomers),    change: "5%",  up: true,  icon: <MdPeople className="text-purple-500" size={20} />,    bg: "bg-purple-50"  },
  { label: "Pelanggan Baru",    value: String(dashboardSummary.newCustomers),       change: "12%", up: true,  icon: <MdPersonAdd className="text-indigo-500" size={20} />, bg: "bg-indigo-50"  },
  { label: "Total Transaksi",   value: String(dashboardSummary.totalTransactions),  change: "8%",  up: true,  icon: <MdReceiptLong className="text-pink-500" size={20} />, bg: "bg-pink-50"    },
  { label: "Total Pendapatan",  value: `Rp ${(dashboardSummary.totalRevenue / 1000000).toFixed(1)}Jt`, change: "10%", up: true, icon: <MdPayments className="text-emerald-500" size={20} />, bg: "bg-emerald-50" },
];

const crmStats = [
  { label: "Komplain Aktif", value: String(dashboardSummary.activeComplaints), icon: <MdWarning className="text-red-500" size={20} />,        bg: "bg-red-50"    },
  { label: "Member Gold",    value: String(dashboardSummary.goldMembers),       icon: <MdStar className="text-yellow-500" size={20} />,        bg: "bg-yellow-50" },
  { label: "Promo Aktif",    value: String(dashboardSummary.activePromos),      icon: <MdLocalOffer className="text-orange-500" size={20} />,  bg: "bg-orange-50" },
];

const recentOrders = orders.slice(-5).reverse();
const statusType   = { Selesai: "success", Diterima: "info", Dicuci: "warning", Disetrika: "warning", "Siap Diambil": "primary", Proses: "warning", Antrian: "info", Dibatalkan: "danger" };

const schedules = [
  { time: "09:30", type: "Laundry Express", desc: "Pengambilan Cucian Budi" },
  { time: "12:00", type: "Laundry Reguler", desc: "Pengiriman Cucian Sari"  },
  { time: "15:00", type: "Dry Cleaning",    desc: "Selesai Jas Pak Rudi"    },
];

export default function Dashboard() {
  const activeComplaints = complaints.filter((c) => c.status === "Aktif" || c.status === "Proses");
  const totalSourceCount = customerSources.reduce((s, x) => s + x.count, 0);

  return (
    <Container>
      <PageHeader
        title="Dashboard"
        subtitle="Selamat datang kembali"
        breadcrumb={["Dashboard"]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-8 space-y-6">

          {/* Main Stats */}
          <StatsSection stats={statsData} />

          {/* CRM Module Summary */}
          <div className="grid grid-cols-3 gap-4">
            {/* Marketing Automation */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center">
                  <MdCampaign className="text-pink-500" size={18} />
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Marketing</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{dashboardSummary.activePromos}</p>
              <p className="text-xs text-gray-400 mt-0.5">Promo Aktif</p>
              <span className="text-[10px] font-bold mt-1 inline-block text-pink-500">▲ 2 promo baru</span>
            </div>
            {/* Sales Automation */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <MdTrendingUp className="text-indigo-500" size={18} />
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Sales</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{dashboardSummary.goldMembers}</p>
              <p className="text-xs text-gray-400 mt-0.5">Member Gold</p>
              <span className="text-[10px] font-bold mt-1 inline-block text-emerald-500">▲ {dashboardSummary.newCustomers} baru</span>
            </div>
            {/* Service Automation */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                  <MdSupportAgent className="text-red-500" size={18} />
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Service</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{dashboardSummary.activeComplaints}</p>
              <p className="text-xs text-gray-400 mt-0.5">Komplain Aktif</p>
              <span className="text-[10px] font-bold mt-1 inline-block text-red-500">● Perlu penanganan</span>
            </div>
          </div>

          {/* Overview Chart */}
          <Card className="p-4 bg-white rounded-2xl shadow-sm"> 
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800">Laundry Overview</h3>
              <select className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 outline-none text-gray-600">
                <option>Minggu Ini</option>
                <option>Bulan Ini</option>
              </select>
            </div>

            {/* Chart Container */}
            {/* Ditambahkan h-56 agar ada ruang untuk teks hari di bawahnya */}
            <div className="flex justify-between items-end h-56 px-2 border-b border-gray-100 pb-2">
              {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day, i) => {
                const heights = [50, 70, 45, 80, 60, 90, 40];
                return (
                  <div key={day} className="flex flex-col items-center justify-end h-full gap-2 w-full">
                    {/* PERBAIKAN: Menggunakan backticks ` untuk string literal */}
                    <div className="w-4 flex flex-col gap-0.5 justify-end" style={{ height: `${heights[i]}%` }}>
                      <div className="bg-pink-400 rounded-full w-full h-[15%]" />
                      <div className="bg-orange-300 rounded-full w-full h-[25%]" />
                      <div className="bg-[#6344f2] rounded-full w-full flex-1" />
                    </div>
                    <span className="text-[10px] font-medium text-gray-400 whitespace-nowrap">{day}</span>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex gap-4 mt-4 justify-center">
              {[["bg-[#6344f2]","Cuci"],["bg-orange-300","Setrika"],["bg-pink-400","Express"]].map(([c,l]) => (
                <div key={l} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className={`w-2.5 h-2.5 rounded-full ${c}`} />{l}
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Orders */}
          <Card>
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-gray-800">Pesanan Terbaru</h3>
              <Badge type="info">{recentOrders.length} pesanan</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100">
                    <th className="pb-3 font-medium">Pelanggan</th>
                    <th className="pb-3 font-medium">Layanan</th>
                    <th className="pb-3 font-medium">Total</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Avatar name={row.customer} size="sm" />
                          <span className="font-semibold text-gray-700">{row.customer}</span>
                        </div>
                      </td>
                      <td className="py-3 text-gray-500">{row.service}</td>
                      <td className="py-3 font-bold text-[#6344f2] text-xs">Rp {row.total.toLocaleString("id-ID")}</td>
                      <td className="py-3">
                        <Badge type={statusType[row.status] ?? "secondary"}>{row.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Active Complaints */}
          <Card>
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-gray-800">Komplain Aktif</h3>
              <Badge type="danger">{activeComplaints.length} komplain</Badge>
            </div>
            <div className="space-y-3">
              {activeComplaints.map((c) => (
                <div key={c.id} className="flex items-start gap-3 p-3 bg-red-50/40 rounded-xl border border-red-100">
                  <Avatar name={c.customer} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-gray-800 text-sm truncate">{c.customer}</p>
                      <Badge type={c.priority === "Tinggi" ? "danger" : c.priority === "Sedang" ? "warning" : "secondary"}>{c.priority}</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{c.issue}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{c.id} · {c.category} · {c.createdAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-4 space-y-6">

          {/* Calendar */}
          <Card>
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-gray-800">Jadwal Pengambilan</h3>
              <div className="w-8 h-8 bg-purple-50 text-[#6344f2] rounded-lg flex items-center justify-center">
                <MdCalendarToday size={16} />
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <button className="p-1 bg-[#6344f2] text-white rounded-lg"><MdChevronLeft /></button>
                <span className="font-bold text-sm text-gray-700">Juli, 2026</span>
                <button className="p-1 bg-[#6344f2] text-white rounded-lg"><MdChevronRight /></button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
                {["Mi","Se","Se","Ra","Ka","Ju","Sa"].map((d, i) => (
                  <div key={i} className="text-gray-400 font-bold py-1">{d}</div>
                ))}
                {[...Array(31)].map((_, i) => (
                  <div key={i} className={`py-1.5 rounded-lg font-medium text-[10px] cursor-pointer ${
                    i + 1 === 14 ? "bg-[#6344f2] text-white" : "hover:bg-gray-100 text-gray-600"
                  }`}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-400">Senin, 14 Juli 2026</span>
                <MdMoreVert className="text-gray-400" size={16} />
              </div>
              <div className="space-y-4">
                {schedules.map((ev, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-xs font-bold text-gray-700 w-10 shrink-0 pt-0.5">{ev.time}</span>
                    <div className="border-l-2 border-purple-200 pl-3">
                      <p className="text-[10px] text-gray-400 font-medium">{ev.type}</p>
                      <p className="text-sm font-semibold text-gray-800">{ev.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Sumber Pelanggan — Marketing Insight */}
          <Card>
            <h3 className="font-bold text-gray-800 mb-4">Sumber Pelanggan</h3>
            <div className="space-y-3">
              {customerSources.map((s) => (
                <div key={s.source} className="flex items-center gap-3">
                  <span className="text-xs text-gray-600 w-20 shrink-0">{s.source}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${(s.count / totalSourceCount) * 100}%`, backgroundColor: s.color }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-700 w-6 text-right">{s.count}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-3">Total {totalSourceCount} pelanggan terdata</p>
          </Card>

          {/* Quick CRM Stats */}
          <Card>
            <h3 className="font-bold text-gray-800 mb-4">CRM Ringkasan</h3>
            <div className="space-y-3">
              {crmStats.map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">{s.label}</p>
                    <p className="text-lg font-bold text-gray-800">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </Container>
  );
}
