import { useState } from "react";
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

// Data untuk Stats Cards
const stats = [
  {
    label: "Total Cucian",
    value: "560",
    change: "12%",
    up: true,
    icon: <MdLocalLaundryService className="text-purple-500" />,
    bg: "bg-purple-50",
  },
  {
    label: "Pesanan Masuk",
    value: "1050",
    change: "5%",
    up: true,
    icon: <MdInventory2 className="text-indigo-500" />,
    bg: "bg-indigo-50",
  },
  {
    label: "Sudah Selesai",
    value: "470",
    change: "8%",
    up: false,
    icon: <MdCheckroom className="text-pink-500" />,
    bg: "bg-pink-50",
  },
  {
    label: "Total Pendapatan",
    value: "250",
    change: "12%",
    up: true,
    icon: <MdPayments className="text-emerald-500" />,
    bg: "bg-emerald-50",
  },
];

const laundryData = [
  {
    name: "Budi Santoso",
    role: "Cuci Kering",
    type: "Express",
    time: "09:27 AM",
    status: "Selesai",
  },
  {
    name: "Siti Aminah",
    role: "Setrika",
    type: "Regular",
    time: "10:15 AM",
    status: "Proses",
  },
  {
    name: "Andi Wijaya",
    role: "Cuci Sepatu",
    type: "Express",
    time: "10:24 AM",
    status: "Proses",
  },
  {
    name: "Dewi Lestari",
    role: "Cuci Selimut",
    type: "Regular",
    time: "09:10 AM",
    status: "Selesai",
  },
  {
    name: "Rizky Pratama",
    role: "Cuci Kiloan",
    type: "Regular",
    time: "09:15 AM",
    status: "Selesai",
  },
];

export default function Dashboard() {
  return (
    <div className="bg-[#F8F9FD] min-h-screen p-6 font-sans text-gray-700">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-6">

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-50 relative overflow-hidden"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}
                    >
                      {s.icon}
                    </div>

                    <span className="text-sm font-medium text-gray-500">
                      {s.label}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-1 rounded-lg font-bold flex items-center gap-1 ${
                      s.up
                        ? "bg-emerald-50 text-emerald-500"
                        : "bg-red-50 text-red-500"
                    }`}
                  >
                    {s.up ? "▲" : "▼"} {s.change}
                  </span>
                </div>

                <div className="mt-4">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {s.value}
                  </h2>

                  <p className="text-[10px] text-gray-400 mt-1">
                    Update: July 14, 2026
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Laundry Overview */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-lg">
                Laundry Overview
              </h3>

              <select className="text-xs bg-gray-50 border-none rounded-lg px-3 py-1.5 outline-none">
                <option>Hari Ini</option>
              </select>
            </div>

            {/* Visual Bars */}
            <div className="flex justify-between items-end h-64 px-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day) => (
                  <div
                    key={day}
                    className="flex flex-col items-center gap-3 w-full"
                  >
                    <div className="w-3 flex flex-col gap-1 h-48 justify-end">
                      <div className="bg-pink-400 rounded-full w-full h-[15%]"></div>
                      <div className="bg-orange-300 rounded-full w-full h-[25%]"></div>
                      <div className="bg-[#6344f2] rounded-full w-full h-[50%]"></div>
                    </div>

                    <span className="text-[10px] font-medium text-gray-400">
                      {day}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">
                Deadline Cucian
              </h3>

              <button className="text-xs font-bold text-gray-400 border border-gray-200 px-4 py-1.5 rounded-xl hover:bg-gray-50">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-300 text-[11px] uppercase tracking-wider border-b border-gray-50">
                    <th className="pb-4 font-medium">Nama Pelanggan</th>
                    <th className="pb-4 font-medium">Jenis Laundry</th>
                    <th className="pb-4 font-medium">Layanan</th>
                    <th className="pb-4 font-medium">Jam Masuk</th>
                    <th className="pb-4 font-medium">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {laundryData.map((row, i) => (
                    <tr key={i} className="text-sm">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                            <img
                              src={`https://i.pravatar.cc/150?u=${i}`}
                              alt=""
                            />
                          </div>

                          <span className="font-semibold text-gray-700">
                            {row.name}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 text-gray-500">
                        {row.role}
                      </td>

                      <td className="py-4 text-gray-500">
                        {row.type}
                      </td>

                      <td className="py-4 font-medium">
                        {row.time}
                      </td>

                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                            row.status === "Selesai"
                              ? "bg-emerald-50 text-emerald-500"
                              : "bg-red-50 text-red-500"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 h-full">

            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">
                Jadwal Pengambilan
              </h3>

              <div className="w-8 h-8 bg-purple-50 text-[#6344f2] rounded-lg flex items-center justify-center">
                <MdCalendarToday size={18} />
              </div>
            </div>

            {/* Calendar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <button className="p-1 bg-[#6344f2] text-white rounded-lg">
                  <MdChevronLeft />
                </button>

                <span className="font-bold text-sm">
                  July, 2026
                </span>

                <button className="p-1 bg-[#6344f2] text-white rounded-lg">
                  <MdChevronRight />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center text-[10px]">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <div
                    key={d}
                    className="text-gray-400 font-bold"
                  >
                    {d}
                  </div>
                ))}

                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className={`py-1.5 rounded-lg font-medium ${
                      i + 1 === 6
                        ? "bg-[#6344f2] text-white"
                        : "hover:bg-gray-100 cursor-pointer"
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400">
                  Wednesday, 06 July 2026
                </span>

                <MdMoreVert className="text-gray-400" />
              </div>

              <div className="space-y-4">
                {[
                  {
                    time: "09:30",
                    role: "Laundry Express",
                    task: "Pengambilan Cucian Budi",
                  },
                  {
                    time: "12:00",
                    role: "Laundry Regular",
                    task: "Pengiriman Cucian Siti",
                  },
                ].map((ev, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-xs font-bold text-gray-800 w-10">
                      {ev.time}
                    </span>

                    <div className="border-l-2 border-purple-200 pl-4">
                      <p className="text-[10px] text-gray-400 font-medium">
                        {ev.role}
                      </p>

                      <p className="text-sm font-bold text-gray-800">
                        {ev.task}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}