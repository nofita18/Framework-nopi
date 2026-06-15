import { useState, useRef } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import {
  FaGift,
  FaTicketAlt,
  FaCoins,
  FaHeadset,
  FaCrown,
  FaArrowRight,
  FaHistory,
} from "react-icons/fa";
import { MdLocalLaundryService } from "react-icons/md";

export default function Account() {
  const [activeMenu, setActiveMenu] = useState("Ringkasan");

  // Ref untuk navigasi otomatis (scroll to section)
  const ringkasanRef = useRef(null);
  const voucherRef = useRef(null);
  const riwayatRef = useRef(null);
  const bantuanRef = useRef(null);

  const handleNavigation = (menuName, elementRef) => {
    setActiveMenu(menuName);
    elementRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    // Menggunakan bg-[#f6f4fb] agar senada dengan background AuthLayout
    <div className="min-h-screen bg-[#f6f4fb] text-slate-800 font-sans antialiased pb-12">

      {/* NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-[#efecf7] sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">

          <div className="flex items-center gap-2">
            {/* Menggunakan ungu utama #7c4dff */}
            <div className="w-8 h-8 rounded-full bg-[#7c4dff] flex items-center justify-center text-white shadow-sm shadow-[#7c4dff]/20">
              <MdLocalLaundryService size={16} />
            </div>
            <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-[#7c4dff] to-[#9c6bff] bg-clip-text text-transparent">
              LaundryPro
            </h1>
          </div>

          {/* Navigasi Berfungsi dengan gaya ungu pastel */}
          <div className="hidden md:flex gap-1 bg-[#f4f1fb] p-1 rounded-xl text-sm font-medium">
            {[
              { name: "Ringkasan", ref: ringkasanRef },
              { name: "Voucher", ref: voucherRef },
              { name: "Riwayat", ref: riwayatRef },
              { name: "Bantuan", ref: bantuanRef }
            ].map((menu) => (
              <button
                key={menu.name}
                onClick={() => handleNavigation(menu.name, menu.ref)}
                className={`px-4 py-1.5 rounded-lg transition-all ${
                  activeMenu === menu.name
                    ? "bg-white text-[#7c4dff] shadow-sm font-semibold"
                    : "text-gray-500 hover:text-slate-800 hover:bg-white/50"
                }`}
              >
                {menu.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-semibold text-gray-700">Nofita Nurc</p>
              <p className="text-[10px] text-gray-400">ID: LP-8821</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7c4dff] to-[#9c6bff] text-white flex items-center justify-center font-bold shadow-md shadow-[#7c4dff]/20">
              N
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {/* HERO */}
        <div ref={ringkasanRef}>
          {/* Card menggunakan perpaduan ungu gelap dan dekorasi gradasi linear dari layout chart Anda */}
          <Card className="border-0 bg-gradient-to-br from-[#1a103c] via-[#2d1b6b] to-[#4c2ca7] text-white shadow-xl shadow-indigo-950/5 overflow-hidden relative group rounded-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#7c4dff]/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-[#7c4dff]/20 transition-all duration-700" />
            <CardContent className="p-8 md:p-10 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <Badge className="bg-[#ff6b81] hover:bg-[#ff6b81] text-white font-bold tracking-wider px-3 py-1 text-xs rounded-full shadow-lg shadow-[#ff6b81]/20">
                  ★ MEMBER GOLD
                </Badge>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  Selamat Datang Kembali, Nofita!
                </h1>
                <p className="text-[#f0ebfa] text-sm md:text-base leading-relaxed opacity-90">
                  Kelola pesanan laundry, klaim voucher eksklusif, pantau reward point, dan hubungi bantuan pelanggan langsung dari dashboard personal Anda.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PROFILE + STATUS */}
        <div className="grid lg:grid-cols-12 gap-6">

          {/* Card Member Premium (Menggunakan Identitas Utama Ungu #7c4dff) */}
          <Card className="lg:col-span-5 bg-gradient-to-br from-[#7c4dff] via-[#9c6bff] to-[#4c2ca7] text-white border-0 shadow-xl shadow-[#7c4dff]/10 relative overflow-hidden rounded-2xl flex flex-col justify-between group">
            <div className="absolute -right-6 -bottom-6 opacity-10 text-white group-hover:scale-110 transition-transform duration-500">
              <FaCrown size={180} />
            </div>
            <CardContent className="p-6 h-full flex flex-col justify-between gap-8 relative z-10">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold tracking-widest text-[#f0ebfa] opacity-90">
                    DIGITAL MEMBER CARD
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight mt-1">
                    Nofita Nurc
                  </h2>
                </div>
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 shadow-inner">
                  <FaCrown size={24} className="text-amber-300 animate-pulse" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end border-t border-white/20 pt-4">
                  <div className="text-xs space-y-1 text-[#f0ebfa]">
                    <p className="font-mono tracking-wider opacity-80">ID: LP-8821</p>
                    <p className="opacity-70">Bergabung: Jan 2025</p>
                  </div>
                  <Badge className="bg-white text-[#7c4dff] hover:bg-white font-bold px-3 py-1 rounded-lg text-[10px] tracking-wider">
                    GOLD TIER
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Kerja Laundry */}
          <Card className="lg:col-span-7 border-[#efecf7] shadow-sm rounded-2xl bg-white">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-800 tracking-tight">
                      Laundry Aktif sedang Diproses
                    </h3>
                    <p className="text-xs text-gray-400 font-mono">No. Nota: TRX001</p>
                  </div>
                  {/* Badge Pink Soft dari warna chart dekorasi */}
                  <Badge className="bg-[#ff6b81]/10 text-[#ff6b81] hover:bg-[#ff6b81]/10 border border-[#ff6b81]/20 px-2.5 py-1 font-semibold text-xs rounded-lg">
                    ● Siap Diambil
                  </Badge>
                </div>

                <div className="bg-[#f4f1fb] p-4 rounded-xl border border-[#efecf7] mb-2">
                  <p className="font-bold text-gray-700 text-sm">
                    Laundry Kiloan Premium
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">Berat Estimasi: 5 Kg</p>
                </div>
              </div>

              <div className="mt-4">
                {/* Progress bar mengikuti warna gradasi chart Robert */}
                <Progress
                  value={75}
                  className="h-2 bg-[#f0edf8] [&>div]:bg-gradient-to-r [&>div]:from-[#7c4dff] [&>div]:to-[#9c6bff] rounded-full"
                />

                <div className="grid grid-cols-5 mt-3 text-[10px] font-medium text-center text-gray-400">
                  <span className="text-[#7c4dff] font-bold">Diterima</span>
                  <span className="text-[#7c4dff] font-bold">Dicuci</span>
                  <span className="text-[#7c4dff] font-bold">Disetrika</span>
                  <span className="text-[#9c6bff] font-extrabold scale-105">Siap Diambil</span>
                  <span>Selesai</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* STATISTIK */}
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { title: "Total Pesanan", value: "32", desc: "Order Selesai", color: "text-[#7c4dff]", bg: "bg-[#f4f1fb]" },
            { title: "Total Transaksi", value: "Rp1.250.000", desc: "Akumulasi Biaya", color: "text-gray-800", bg: "bg-[#f0ebfa]" },
            { title: "Reward Point", value: "250", desc: "Siap Ditukarkan", color: "text-[#ff6b81]", bg: "bg-[#ff6b81]/5" },
          ].map((stat, i) => (
            <Card key={i} className="border-[#efecf7] shadow-sm rounded-2xl bg-white overflow-hidden">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.title}</p>
                  <h2 className={`text-2xl md:text-3xl font-black ${stat.color}`}>{stat.value}</h2>
                  <p className="text-[11px] text-gray-400">{stat.desc}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center font-bold`} />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* VOUCHER */}
        <div ref={voucherRef} className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xl text-gray-800 tracking-tight">Voucher Tersedia</h3>
            <span className="text-xs text-[#7c4dff] font-semibold hover:underline cursor-pointer flex items-center gap-1">
              Lihat Semua <FaArrowRight size={10} />
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">

            {/* Voucher 1 */}
            <Card className="border border-dashed border-[#efecf7] bg-white hover:bg-[#f4f1fb]/30 transition-colors shadow-sm rounded-2xl overflow-hidden relative group">
              <CardContent className="p-5 flex gap-4 items-start">
                <div className="p-3 bg-[#ff6b81] text-white rounded-xl shadow-lg shadow-[#ff6b81]/20">
                  <FaGift size={20} />
                </div>
                <div className="space-y-1">
                  <Badge className="bg-[#ff6b81]/10 text-[#ff6b81] hover:bg-[#ff6b81]/10 text-[9px] font-bold rounded-md px-1.5 py-0">CLAIMED</Badge>
                  <h3 className="font-bold text-gray-800 text-base mt-1">Diskon 20% Flat</h3>
                  <p className="text-xs text-gray-400">Khusus paket laundry kiloan Gold Member.</p>
                </div>
              </CardContent>
            </Card>

            {/* Voucher 2 */}
            <Card className="border border-dashed border-[#efecf7] bg-white hover:bg-[#f4f1fb]/30 transition-colors shadow-sm rounded-2xl overflow-hidden relative group">
              <CardContent className="p-5 flex gap-4 items-start">
                <div className="p-3 bg-[#7c4dff] text-white rounded-xl shadow-lg shadow-[#7c4dff]/20">
                  <FaTicketAlt size={20} />
                </div>
                <div className="space-y-1">
                  <Badge className="bg-[#7c4dff]/10 text-[#7c4dff] hover:bg-[#7c4dff]/10 text-[9px] font-bold rounded-md px-1.5 py-0">POTONGAN</Badge>
                  <h3 className="font-bold text-gray-800 text-base mt-1">Voucher Rp10.000</h3>
                  <p className="text-xs text-gray-400">Minimal transaksi pencucian Rp50.000.</p>
                </div>
              </CardContent>
            </Card>

            {/* Voucher 3 */}
            <Card className="border border-dashed border-[#efecf7] bg-white hover:bg-[#f4f1fb]/30 transition-colors shadow-sm rounded-2xl overflow-hidden relative group">
              <CardContent className="p-5 flex gap-4 items-start">
                <div className="p-3 bg-amber-500 text-white rounded-xl shadow-lg shadow-amber-500/20">
                  <FaCoins size={20} />
                </div>
                <div className="space-y-1">
                  <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 text-[9px] font-bold rounded-md px-1.5 py-0">LOYALITAS</Badge>
                  <h3 className="font-bold text-gray-800 text-base mt-1">Bonus 2x Reward</h3>
                  <p className="text-xs text-gray-400">Dapatkan poin ganda di transaksi berikutnya.</p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* BENEFIT + RIWAYAT */}
        <div ref={riwayatRef} className="grid lg:grid-cols-12 gap-6">

          {/* Benefit */}
          <Card className="lg:col-span-5 border-[#efecf7] shadow-sm rounded-2xl bg-white overflow-hidden">
            <div className="p-5 bg-[#f4f1fb] border-b border-[#efecf7]">
              <h3 className="font-bold text-base text-gray-800">Benefit Gold Member Anda</h3>
            </div>
            <CardContent className="p-6">
              <ul className="space-y-3.5 text-sm font-medium text-gray-600">
                {[
                  "Prioritas utama antrean pengerjaan laundry",
                  "Diskon otomatis terpotong di setiap transaksi",
                  "Mendapatkan bonus poin reward lebih besar",
                  "Akses promo kilat & eksklusif khusus member"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#f0ebfa] flex items-center justify-center text-[#7c4dff] text-xs font-bold">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Riwayat */}
          <Card className="lg:col-span-7 border-[#efecf7] shadow-sm rounded-2xl bg-white overflow-hidden">
            <div className="p-5 bg-[#f4f1fb] border-b border-[#efecf7] flex items-center justify-between">
              <h3 className="font-bold text-base text-gray-800 flex items-center gap-2">
                <FaHistory className="text-gray-400" /> Riwayat Penyelesaian Laundry
              </h3>
            </div>
            <CardContent className="p-6 divide-y divide-slate-100">
              {[
                { id: "TRX001", type: "Laundry Kiloan Reguler", status: "Selesai", date: "12 Juni 2026" },
                { id: "TRX002", type: "Laundry Express Kilat 1 Hari", status: "Selesai", date: "08 Juni 2026" }
              ].map((item, i) => (
                <div key={i} className={`flex justify-between items-center ${i === 0 ? "pb-4" : "pt-4"}`}>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-sm font-bold text-gray-700">{item.id}</p>
                      <span className="text-[11px] text-gray-400">• {item.date}</span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">{item.type}</p>
                  </div>
                  <Badge className="bg-[#f4f1fb] text-[#7c4dff] hover:bg-[#f4f1fb] font-medium px-2.5 py-0.5 border border-[#efecf7] text-xs rounded-md">
                    {item.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

        {/* BANTUAN */}
        <div ref={bantuanRef}>
          <Card className="border-0 bg-white shadow-md shadow-slate-100 rounded-2xl overflow-hidden border-l-4 border-l-[#7c4dff]">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-start md:items-center gap-4">
                  <div className="p-3.5 bg-[#f4f1fb] text-[#7c4dff] rounded-xl border border-[#efecf7]">
                    <FaHeadset size={24} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-gray-800 tracking-tight">
                      Butuh Bantuan atau Ajukan Komplain?
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">
                      Tiket Aktif: <span className="font-mono font-bold text-[#ff6b81]">TK001</span> - Laundry terlambat selesai (Sedang Ditinjau)
                    </p>
                  </div>
                </div>
                <Button className="bg-[#7c4dff] hover:bg-[#693ce6] text-white font-semibold px-6 py-5 rounded-xl shadow-lg shadow-[#7c4dff]/10 transition-all flex-shrink-0">
                  Hubungi Agen Bantuan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <footer className="mt-16 border-t border-[#efecf7] bg-white">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Kiri: Logo & Copyright */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#7c4dff] flex items-center justify-center text-white">
                        <MdLocalLaundryService size={12} />
                    </div>
                    <span className="font-bold text-sm tracking-tight text-gray-800">
                        LaundryPro
                    </span>
                    </div>
                    <p className="text-xs text-gray-400 text-center md:text-left">
                    &copy; {new Date().getFullYear()} LaundryPro. Hak Cipta Dilindungi.
                    </p>
                </div>

                {/* Kanan: Navigasi Ringkas Footer */}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-400">
                    <a href="#kebijakan" className="hover:text-[#7c4dff] transition-colors">
                    Kebijakan Privasi
                    </a>
                    <a href="#syarat" className="hover:text-[#7c4dff] transition-colors">
                    Syarat & Ketentuan
                    </a>
                    <a href="#bantuan" className="hover:text-[#7c4dff] transition-colors">
                    Pusat Bantuan
                    </a>
                </div>

                </div>
            </div>
        </footer>
    </div>
    
  );
}