import {
  MdLocalLaundryService,
  MdInventory2,
  MdCheckroom,
  MdPayments,
  MdChevronLeft,
  MdChevronRight,
  MdMoreVert,
  MdCalendarToday,
} from "react-icons/md";

import PageHeader   from "../components/PageHeader";
import Container    from "../components/Container";
import StatsSection from "../components/StatsSection";
import Card         from "../components/Card";
import Badge        from "../components/Badge";
import Spinner      from "../components/Spinner";
import Avatar       from "../components/Avatar";

const statsData = [
  { label: "Total Cucian",    value: "560",  change: "12%", up: true,  icon: <MdLocalLaundryService className="text-purple-500" size={20} />, bg: "bg-purple-50" },
  { label: "Pesanan Masuk",   value: "1050", change: "5%",  up: true,  icon: <MdInventory2 className="text-indigo-500" size={20} />,         bg: "bg-indigo-50" },
  { label: "Sudah Selesai",   value: "470",  change: "8%",  up: false, icon: <MdCheckroom className="text-pink-500" size={20} />,            bg: "bg-pink-50"   },
  { label: "Total Pendapatan",value: "4.2M", change: "12%", up: true,  icon: <MdPayments className="text-emerald-500" size={20} />,          bg: "bg-emerald-50"},
];

const recentOrders = [
  { name: "Budi Santoso",  service: "Cuci Kering",  type: "Express", time: "09:27 AM", status: "Selesai" },
  { name: "Siti Aminah",   service: "Setrika",       type: "Reguler", time: "10:15 AM", status: "Proses"  },
  { name: "Andi Wijaya",   service: "Cuci Sepatu",   type: "Express", time: "10:24 AM", status: "Proses"  },
  { name: "Dewi Lestari",  service: "Cuci Selimut",  type: "Reguler", time: "09:10 AM", status: "Selesai" },
  { name: "Rizky Pratama", service: "Cuci Kiloan",   type: "Reguler", time: "09:15 AM", status: "Selesai" },
];

const statusType = { Selesai: "success", Proses: "warning", Antrian: "info" };

const schedules = [
  { time: "09:30", type: "Laundry Express", desc: "Pengambilan Cucian Budi" },
  { time: "12:00", type: "Laundry Reguler", desc: "Pengiriman Cucian Siti"  },
  { time: "15:00", type: "Dry Cleaning",    desc: "Selesai Jas Pak Hendra"  },
];

export default function Dashboard() {
  return (
    <Container>
      <PageHeader
        title="Dashboard"
        subtitle="Selamat datang kembali, Admin 👋"
        breadcrumb={["Dashboard"]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-8 space-y-6">

          {/* Stats */}
          <StatsSection stats={statsData} />

          {/* Overview Chart */}
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800">Laundry Overview</h3>
              <select className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 outline-none text-gray-600">
                <option>Minggu Ini</option>
                <option>Bulan Ini</option>
              </select>
            </div>
            <div className="flex justify-between items-end h-48 px-2">
              {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day, i) => {
                const heights = [50, 70, 45, 80, 60, 90, 40];
                return (
                  <div key={day} className="flex flex-col items-center gap-2 w-full">
                    <div className="w-4 flex flex-col gap-0.5 justify-end" style={{ height: `${heights[i]}%` }}>
                      <div className="bg-pink-400 rounded-full w-full h-[15%]" />
                      <div className="bg-orange-300 rounded-full w-full h-[25%]" />
                      <div className="bg-[#6344f2] rounded-full w-full flex-1" />
                    </div>
                    <span className="text-[10px] font-medium text-gray-400">{day}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4 mt-4 justify-center">
              {[["bg-[#6344f2]","Cuci"],["bg-orange-300","Setrika"],["bg-pink-400","Express"]].map(([c,l]) => (
                <div key={l} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className={`w-2.5 h-2.5 rounded-full ${c}`} />{l}
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Orders Table */}
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
                    <th className="pb-3 font-medium">Tipe</th>
                    <th className="pb-3 font-medium">Jam Masuk</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Avatar name={row.name} size="sm" />
                          <span className="font-semibold text-gray-700">{row.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-gray-500">{row.service}</td>
                      <td className="py-3 text-gray-500">{row.type}</td>
                      <td className="py-3 font-medium text-gray-700">{row.time}</td>
                      <td className="py-3">
                        <Badge type={statusType[row.status] ?? "secondary"}>{row.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="h-full">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-gray-800">Jadwal Pengambilan</h3>
              <div className="w-8 h-8 bg-purple-50 text-[#6344f2] rounded-lg flex items-center justify-center">
                <MdCalendarToday size={16} />
              </div>
            </div>

            {/* Mini Calendar */}
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

            {/* Schedule List */}
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

            {/* Loading indicator */}
            <div className="mt-6 flex items-center gap-2 text-xs text-gray-400">
              <Spinner size="sm" />
              <span>Sinkronisasi jadwal...</span>
            </div>
          </Card>
        </div>

      </div>
    </Container>
  );
}
