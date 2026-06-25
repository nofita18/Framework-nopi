import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdLocalLaundryService,
  MdLogout,
  MdLocalOffer,
  MdHistory,
  MdHeadsetMic,
  MdHome,
  MdStar,
  MdCheckCircle,
  MdArrowForward,
  MdReceiptLong,
  MdAccessTime,
} from "react-icons/md";
import { FaCrown, FaCoins, FaGift, FaTicketAlt } from "react-icons/fa";

// ── Data prototype (dummy) ────────────────────────────
const user = {
  name: "Nofita Nurc",
  id: "LP-8821",
  membership: "Gold",
  joinDate: "Jan 2025",
  points: 250,
  totalOrders: 32,
  totalSpent: "Rp 1.250.000",
};

const activeOrder = {
  id: "TRX001",
  service: "Laundry Kiloan Premium",
  weight: "5 Kg",
  status: "Siap Diambil",
  progress: 80,
};

const statusSteps = ["Diterima", "Dicuci", "Disetrika", "Siap Diambil", "Selesai"];

const orderHistory = [
  { id: "TRX001", service: "Laundry Kiloan Reguler",       date: "12 Jun 2026", total: "Rp 45.000",  status: "Selesai" },
  { id: "TRX002", service: "Laundry Express Kilat 1 Hari", date: "08 Jun 2026", total: "Rp 60.000",  status: "Selesai" },
  { id: "TRX003", service: "Dry Cleaning Jas",             date: "01 Jun 2026", total: "Rp 70.000",  status: "Selesai" },
  { id: "TRX004", service: "Cuci Sepatu",                  date: "25 Mei 2026", total: "Rp 25.000",  status: "Selesai" },
];

const vouchers = [
  { icon: <FaGift size={18} />, color: "bg-[#ff6b81]", badge: "CLAIMED",   badgeColor: "bg-[#ff6b81]/10 text-[#ff6b81]", title: "Diskon 20% Flat",     desc: "Khusus paket kiloan Gold Member" },
  { icon: <FaTicketAlt size={18} />, color: "bg-[#7c4dff]", badge: "POTONGAN", badgeColor: "bg-[#7c4dff]/10 text-[#7c4dff]", title: "Voucher Rp10.000",    desc: "Min. transaksi Rp50.000" },
  { icon: <FaCoins size={18} />,  color: "bg-amber-500",   badge: "LOYALITAS", badgeColor: "bg-amber-50 text-amber-700",        title: "Bonus 2x Reward",    desc: "Poin ganda transaksi berikutnya" },
];

const goldBenefits = [
  "Prioritas utama antrean pengerjaan laundry",
  "Diskon otomatis terpotong di setiap transaksi",
  "Bonus poin reward lebih besar di setiap order",
  "Akses promo kilat & eksklusif khusus member",
];

// ── Komponen ──────────────────────────────────────────
export default function Account() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Home");

  const homeRef    = useRef(null);
  const voucherRef = useRef(null);
  const historyRef = useRef(null);
  const helpRef    = useRef(null);

  const menus = [
    { name: "Home",    ref: homeRef,    icon: <MdHome size={16} /> },
    { name: "Voucher", ref: voucherRef, icon: <MdLocalOffer size={16} /> },
    { name: "Riwayat", ref: historyRef, icon: <MdHistory size={16} /> },
    { name: "Bantuan", ref: helpRef,    icon: <MdHeadsetMic size={16} /> },
  ];

  const scrollTo = (name, ref) => {
    setActiveMenu(name);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const activeStep = statusSteps.indexOf(activeOrder.status);

  return (
    <div className="min-h-screen bg-[#f6f4fb] font-sans pb-16">

      {/* ── NAVBAR ── */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-[#efecf7] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto h-16 px-5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#7c4dff] flex items-center justify-center text-white">
              <MdLocalLaundryService size={16} />
            </div>
            <span className="font-bold text-base text-gray-800">LaundryPro</span>
          </div>

          {/* Menu Tabs */}
          <div className="hidden md:flex gap-1 bg-[#f4f1fb] p-1 rounded-xl text-sm font-medium">
            {menus.map((m) => (
              <button
                key={m.name}
                onClick={() => scrollTo(m.name, m.ref)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg transition-all ${
                  activeMenu === m.name
                    ? "bg-white text-[#7c4dff] shadow-sm font-semibold"
                    : "text-gray-500 hover:text-gray-800 hover:bg-white/50"
                }`}
              >
                {m.icon} {m.name}
              </button>
            ))}
          </div>

          {/* User + Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-semibold text-gray-700">{user.name}</p>
              <p className="text-[10px] text-gray-400">ID: {user.id}</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7c4dff] to-[#9c6bff] text-white flex items-center justify-center font-bold text-sm shadow">
              {user.name.charAt(0)}
            </div>
            <button
              onClick={handleLogout}
              title="Keluar"
              className="p-2 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-500 transition"
            >
              <MdLogout size={18} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex border-t border-[#efecf7]">
          {menus.map((m) => (
            <button
              key={m.name}
              onClick={() => scrollTo(m.name, m.ref)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-all ${
                activeMenu === m.name ? "text-[#7c4dff]" : "text-gray-400"
              }`}
            >
              {m.icon} {m.name}
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 pt-8 space-y-8">

        {/* ── HERO BANNER ── */}
        <div ref={homeRef}>
          <div className="rounded-2xl bg-gradient-to-br from-[#1a103c] via-[#2d1b6b] to-[#4c2ca7] text-white p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#7c4dff]/20 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="relative z-10">
              <span className="inline-block bg-[#ff6b81] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                ★ MEMBER {user.membership.toUpperCase()}
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
                Selamat Datang, {user.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-sm text-[#f0ebfa] opacity-90 max-w-lg">
                Kelola pesanan laundry, klaim voucher, pantau reward point, dan hubungi bantuan pelanggan langsung dari sini.
              </p>
              <div className="flex flex-wrap gap-4 mt-5">
                <div className="bg-white/10 rounded-xl px-4 py-3 text-center">
                  <p className="text-xl font-black">{user.totalOrders}</p>
                  <p className="text-[10px] text-[#f0ebfa] mt-0.5">Total Order</p>
                </div>
                <div className="bg-white/10 rounded-xl px-4 py-3 text-center">
                  <p className="text-xl font-black">{user.totalSpent}</p>
                  <p className="text-[10px] text-[#f0ebfa] mt-0.5">Total Belanja</p>
                </div>
                <div className="bg-white/10 rounded-xl px-4 py-3 text-center">
                  <p className="text-xl font-black">⭐ {user.points}</p>
                  <p className="text-[10px] text-[#f0ebfa] mt-0.5">Reward Point</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MEMBER CARD + PESANAN AKTIF ── */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Member Card */}
          <div className="bg-gradient-to-br from-[#7c4dff] via-[#9c6bff] to-[#4c2ca7] text-white rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[180px] shadow-lg">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <FaCrown size={140} />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[9px] font-bold tracking-widest opacity-80 uppercase">Digital Member Card</p>
                <h2 className="text-xl font-bold mt-1">{user.name}</h2>
              </div>
              <div className="p-2.5 bg-white/10 rounded-xl border border-white/20">
                <FaCrown size={20} className="text-amber-300" />
              </div>
            </div>
            <div className="flex justify-between items-end border-t border-white/20 pt-3 mt-4">
              <div className="text-xs opacity-80">
                <p className="font-mono">ID: {user.id}</p>
                <p>Bergabung: {user.joinDate}</p>
              </div>
              <span className="bg-white text-[#7c4dff] text-[10px] font-bold px-3 py-1 rounded-lg">
                GOLD TIER
              </span>
            </div>
          </div>

          {/* Pesanan Aktif */}
          <div className="bg-white rounded-2xl border border-[#efecf7] shadow-sm p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-gray-800">Pesanan Sedang Diproses</h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">No: {activeOrder.id}</p>
              </div>
              <span className="bg-[#ff6b81]/10 text-[#ff6b81] border border-[#ff6b81]/20 text-xs font-semibold px-2.5 py-1 rounded-lg">
                ● {activeOrder.status}
              </span>
            </div>

            <div className="bg-[#f4f1fb] rounded-xl p-3 mb-4">
              <p className="font-bold text-gray-700 text-sm">{activeOrder.service}</p>
              <p className="text-xs text-gray-400 mt-0.5">Berat: {activeOrder.weight}</p>
            </div>

            {/* Progress Steps */}
            <div>
              <div className="flex items-center gap-1 mb-2">
                {statusSteps.map((step, i) => (
                  <div key={step} className="flex items-center flex-1">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mx-auto ${
                      i <= activeStep ? "bg-[#7c4dff] text-white" : "bg-gray-100 text-gray-400"
                    }`}>
                      {i < activeStep ? <MdCheckCircle size={14} /> : i + 1}
                    </div>
                    {i < statusSteps.length - 1 && (
                      <div className={`h-0.5 flex-1 ${i < activeStep ? "bg-[#7c4dff]" : "bg-gray-200"}`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-5 text-[8px] text-center text-gray-400 mt-1">
                {statusSteps.map((s, i) => (
                  <span key={s} className={i <= activeStep ? "text-[#7c4dff] font-bold" : ""}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── BENEFIT MEMBER ── */}
        <div className="bg-white rounded-2xl border border-[#efecf7] shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-[#f4f1fb] border-b border-[#efecf7] flex items-center gap-2">
            <MdStar className="text-[#7c4dff]" size={18} />
            <h3 className="font-bold text-gray-800">Benefit Gold Member Anda</h3>
          </div>
          <div className="p-6 grid sm:grid-cols-2 gap-3">
            {goldBenefits.map((b, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                <span className="w-5 h-5 rounded-full bg-[#f0ebfa] flex items-center justify-center text-[#7c4dff] text-xs font-bold shrink-0">
                  ✓
                </span>
                {b}
              </div>
            ))}
          </div>
        </div>

        {/* ── VOUCHER ── */}
        <div ref={voucherRef}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-xl text-gray-800">Voucher Tersedia</h3>
            <span className="text-xs text-[#7c4dff] font-semibold flex items-center gap-1 cursor-pointer hover:underline">
              Lihat Semua <MdArrowForward size={12} />
            </span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {vouchers.map((v, i) => (
              <div key={i} className="bg-white border border-dashed border-[#efecf7] rounded-2xl p-5 hover:bg-[#f4f1fb]/40 transition-colors shadow-sm flex gap-4 items-start">
                <div className={`p-3 ${v.color} text-white rounded-xl shadow-md shrink-0`}>
                  {v.icon}
                </div>
                <div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${v.badgeColor}`}>
                    {v.badge}
                  </span>
                  <h4 className="font-bold text-gray-800 text-sm mt-1">{v.title}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIWAYAT ── */}
        <div ref={historyRef}>
          <div className="bg-white rounded-2xl border border-[#efecf7] shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-[#f4f1fb] border-b border-[#efecf7] flex items-center gap-2">
              <MdHistory className="text-gray-400" size={18} />
              <h3 className="font-bold text-gray-800">Riwayat Pesanan</h3>
              <span className="ml-auto bg-[#7c4dff]/10 text-[#7c4dff] text-xs font-bold px-2.5 py-0.5 rounded-full">
                {orderHistory.length} transaksi
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {orderHistory.map((o) => (
                <div key={o.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-[#f4f1fb] flex items-center justify-center text-[#7c4dff] shrink-0">
                      <MdReceiptLong size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{o.service}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-mono text-gray-400">{o.id}</span>
                        <span className="text-[10px] text-gray-300">•</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <MdAccessTime size={10} /> {o.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="font-bold text-[#7c4dff] text-sm">{o.total}</p>
                    <span className="text-[10px] bg-emerald-50 text-emerald-600 font-semibold px-2 py-0.5 rounded-full">
                      {o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── BANTUAN ── */}
        <div ref={helpRef}>
          <div className="bg-white rounded-2xl shadow-sm border border-[#efecf7] border-l-4 border-l-[#7c4dff] p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-[#f4f1fb] text-[#7c4dff] rounded-xl border border-[#efecf7] shrink-0">
                  <MdHeadsetMic size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Butuh Bantuan atau Ajukan Komplain?</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Tiket Aktif:{" "}
                    <span className="font-mono font-bold text-[#ff6b81]">TK001</span>
                    {" "}— Laundry terlambat selesai (Sedang Ditinjau)
                  </p>
                </div>
              </div>
              <button
                onClick={() => alert("Menghubungi agen bantuan... (fitur segera hadir)")}
                className="flex items-center gap-2 bg-[#7c4dff] hover:bg-[#693ce6] text-white font-semibold px-5 py-3 rounded-xl transition-all shadow-md shrink-0"
              >
                <MdHeadsetMic size={18} />
                Hubungi Agen
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ── FOOTER ── */}
      <footer className="mt-16 border-t border-[#efecf7] bg-white">
        <div className="max-w-5xl mx-auto px-5 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#7c4dff] flex items-center justify-center text-white">
              <MdLocalLaundryService size={12} />
            </div>
            <span className="font-bold text-sm text-gray-800">LaundryPro</span>
            <span className="text-xs text-gray-400 ml-2">© {new Date().getFullYear()} Hak Cipta Dilindungi</span>
          </div>
          <div className="flex gap-5 text-xs text-gray-400 font-medium">
            <button className="hover:text-[#7c4dff] transition-colors">Kebijakan Privasi</button>
            <button className="hover:text-[#7c4dff] transition-colors">Syarat & Ketentuan</button>
            <button className="hover:text-[#7c4dff] transition-colors">Pusat Bantuan</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
