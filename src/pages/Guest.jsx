import { useNavigate } from "react-router-dom";
import {
  MdLocalLaundryService,
  MdLogin,
  MdPersonAdd,
  MdStar,
  MdCheckCircle,
  MdLocalOffer,
  MdArrowForward,
  MdPhone,
  MdLocationOn,
  MdAccessTime,
  MdWaterDrop,
  MdIron,
  MdLocalShipping,
} from "react-icons/md";
import { FaCrown, FaMedal } from "react-icons/fa";

// ── Data prototype ────────────────────────────────────
const services = [
  { icon: <MdWaterDrop size={28} />, name: "Cuci Kiloan",      price: "Rp 7.000/kg",  desc: "Cuci bersih pakai detergen premium",       color: "bg-blue-50 text-blue-500"    },
  { icon: <MdIron size={28} />,      name: "Cuci + Setrika",   price: "Rp 10.000/kg", desc: "Cuci bersih dan setrika rapi",              color: "bg-purple-50 text-purple-500" },
  { icon: <MdLocalShipping size={28}/>,name: "Antar Jemput",   price: "Gratis",        desc: "Khusus member, radius 3km",                color: "bg-emerald-50 text-emerald-500"},
  { icon: <MdStar size={28} />,      name: "Dry Cleaning",     price: "Rp 30.000/item",desc: "Perawatan ekstra untuk pakaian premium",   color: "bg-amber-50 text-amber-500"  },
];

const membershipTiers = [
  {
    tier: "Bronze",
    icon: <FaMedal className="text-amber-700" size={28} />,
    color: "border-amber-200 bg-amber-50",
    badge: "bg-amber-100 text-amber-700",
    benefits: ["Poin reward setiap transaksi", "Notifikasi promo via WhatsApp", "Akses riwayat pesanan"],
    minSpend: "Daftar gratis",
  },
  {
    tier: "Silver",
    icon: <FaMedal className="text-gray-400" size={28} />,
    color: "border-gray-200 bg-gray-50",
    badge: "bg-gray-100 text-gray-600",
    benefits: ["Semua benefit Bronze", "Diskon 5% setiap transaksi", "Prioritas antrean"],
    minSpend: "Total belanja Rp 500.000",
  },
  {
    tier: "Gold",
    icon: <FaCrown className="text-yellow-500" size={28} />,
    color: "border-yellow-300 bg-yellow-50 ring-2 ring-yellow-200",
    badge: "bg-yellow-100 text-yellow-700",
    benefits: ["Semua benefit Silver", "Cashback 10%", "Antar jemput gratis", "Bonus poin 2x"],
    minSpend: "Total belanja Rp 1.000.000",
    popular: true,
  },
];

const testimonials = [
  { name: "Dewi L.",      rating: 5, text: "Baju selalu bersih dan wangi, delivery tepat waktu. Sudah 2 tahun setia pakai LaundryPro!",  tier: "Gold"   },
  { name: "Andi W.",      rating: 5, text: "Sebagai member Gold, saya dapet cashback dan prioritas. Worth it banget!", tier: "Gold"   },
  { name: "Budi S.",      rating: 4, text: "Harga terjangkau, kualitas oke. Aplikasinya juga gampang dipake.",          tier: "Bronze" },
];

export default function Guest() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── NAVBAR ── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto h-16 px-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#7c4dff] flex items-center justify-center text-white shadow">
              <MdLocalLaundryService size={18} />
            </div>
            <span className="font-bold text-lg text-gray-800">LaundryPro</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            <button onClick={() => document.getElementById("layanan")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-[#7c4dff] transition-colors">Layanan</button>
            <button onClick={() => document.getElementById("membership")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-[#7c4dff] transition-colors">Membership</button>
            <button onClick={() => document.getElementById("tentang")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-[#7c4dff] transition-colors">Tentang Kami</button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-[#7c4dff] border border-[#7c4dff] rounded-xl hover:bg-purple-50 transition-all"
            >
              <MdLogin size={16} /> Masuk
            </button>
            <button
              onClick={() => navigate("/register")}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#7c4dff] hover:bg-[#693ce6] rounded-xl transition-all shadow-md"
            >
              <MdPersonAdd size={16} /> Daftar
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#1a103c] via-[#2d1b6b] to-[#4c2ca7] text-white py-20 px-5 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-80 h-80 bg-[#7c4dff]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-60 h-60 bg-[#ff6b81]/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block bg-[#ff6b81] text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4">
              ✨ Laundry Premium Terpercaya
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
              Laundry Bersih, <br />
              <span className="text-[#c4b5fd]">Hidup Lebih Ringan</span>
            </h1>
            <p className="text-base text-[#f0ebfa] opacity-90 mb-8 leading-relaxed">
              LaundryPro hadir dengan layanan cuci, setrika, dan dry cleaning berkualitas tinggi. Daftar sebagai member dan nikmati reward eksklusif di setiap transaksi.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/register")}
                className="flex items-center gap-2 bg-[#7c4dff] hover:bg-[#693ce6] text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-[#7c4dff]/30"
              >
                <MdPersonAdd size={20} />
                Daftar Sekarang — Gratis
              </button>
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl transition-all"
              >
                <MdLogin size={20} />
                Sudah Punya Akun?
              </button>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 mt-10">
              {[["1.200+","Pelanggan Aktif"], ["4.8★","Rating Kepuasan"], ["2 Jam","Layanan Express"]].map(([val, label]) => (
                <div key={label}>
                  <p className="text-xl font-black">{val}</p>
                  <p className="text-xs text-[#f0ebfa] opacity-70 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LAYANAN ── */}
      <section id="layanan" className="py-16 px-5 bg-[#f6f4fb]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">Layanan Kami</h2>
            <p className="text-sm text-gray-500">Pilihan lengkap untuk kebutuhan laundry Anda</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer text-center">
                <div className={`w-14 h-14 rounded-xl ${s.color} flex items-center justify-center mx-auto mb-4`}>
                  {s.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{s.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{s.desc}</p>
                <span className="text-sm font-black text-[#7c4dff]">{s.price}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/register")}
              className="flex items-center gap-2 mx-auto bg-[#7c4dff] hover:bg-[#693ce6] text-white font-semibold px-6 py-3 rounded-xl transition-all"
            >
              Pesan Sekarang <MdArrowForward size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP ── */}
      <section id="membership" className="py-16 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">Program Membership</h2>
            <p className="text-sm text-gray-500">Semakin sering laundry, semakin banyak keuntungan yang Anda dapatkan</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {membershipTiers.map((m) => (
              <div
                key={m.tier}
                className={`rounded-2xl border-2 p-6 relative transition-all hover:shadow-lg ${m.color}`}
              >
                {m.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7c4dff] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow">
                    PALING POPULER
                  </span>
                )}
                <div className="flex items-center gap-3 mb-4">
                  {m.icon}
                  <div>
                    <h3 className="font-extrabold text-gray-800 text-lg">{m.tier}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${m.badge}`}>MEMBER</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-4 font-medium">{m.minSpend}</p>
                <ul className="space-y-2 mb-6">
                  {m.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <MdCheckCircle className="text-[#7c4dff] shrink-0" size={16} />
                      {b}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/register")}
                  className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                    m.popular
                      ? "bg-[#7c4dff] text-white hover:bg-[#693ce6] shadow-md"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Daftar {m.tier} <MdArrowForward size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="py-12 px-5 bg-gradient-to-r from-[#7c4dff] to-[#9c6bff]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-white text-center md:text-left">
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <MdLocalOffer size={22} />
              <span className="font-bold text-lg">Promo Spesial Sekarang!</span>
            </div>
            <p className="text-sm text-purple-100">
              Daftar hari ini dan dapatkan <strong>diskon 20%</strong> untuk 3 transaksi pertama Anda.
            </p>
          </div>
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-[#7c4dff] font-bold px-6 py-3 rounded-xl hover:bg-purple-50 transition-all shadow-lg shrink-0 flex items-center gap-2"
          >
            <MdPersonAdd size={18} />
            Klaim Sekarang
          </button>
        </div>
      </section>

      {/* ── TESTIMONI ── */}
      <section className="py-16 px-5 bg-[#f6f4fb]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">Apa Kata Pelanggan</h2>
            <p className="text-sm text-gray-500">Kepuasan pelanggan adalah prioritas utama kami</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <MdStar key={j} className="text-yellow-400" size={16} />
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f4f1fb] flex items-center justify-center font-bold text-[#7c4dff] text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      t.tier === "Gold" ? "bg-yellow-100 text-yellow-700" : "bg-amber-50 text-amber-700"
                    }`}>
                      {t.tier === "Gold" ? "🥇" : "🥉"} {t.tier} Member
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TENTANG KAMI ── */}
      <section id="tentang" className="py-16 px-5 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4">Tentang LaundryPro</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-2xl mx-auto">
            LaundryPro adalah layanan laundry profesional yang berdiri sejak 2023. Kami berkomitmen memberikan layanan cuci terbaik dengan teknologi modern, detergen premium, dan sistem manajemen digital untuk kepuasan pelanggan.
          </p>
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {[
              { icon: <MdLocationOn className="text-[#7c4dff]" size={24} />, label: "Lokasi", value: "Pekanbaru, Riau" },
              { icon: <MdPhone className="text-[#7c4dff]" size={24} />,      label: "WhatsApp", value: "0812-3456-7890" },
              { icon: <MdAccessTime className="text-[#7c4dff]" size={24} />, label: "Jam Buka", value: "08.00 – 21.00 WIB" },
            ].map((c) => (
              <div key={c.label} className="bg-[#f6f4fb] rounded-2xl p-5 flex flex-col items-center gap-2">
                {c.icon}
                <p className="text-xs text-gray-400 font-medium">{c.label}</p>
                <p className="font-bold text-gray-700 text-sm">{c.value}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#1a103c] to-[#4c2ca7] text-white rounded-2xl p-8">
            <h3 className="text-xl font-extrabold mb-2">Siap Bergabung?</h3>
            <p className="text-sm text-[#f0ebfa] opacity-90 mb-6">
              Daftar gratis sekarang dan mulai nikmati layanan laundry premium dengan keuntungan member.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => navigate("/register")}
                className="flex items-center gap-2 bg-[#7c4dff] hover:bg-[#693ce6] text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md"
              >
                <MdPersonAdd size={18} />
                Daftar Gratis
              </button>
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all"
              >
                <MdLogin size={18} />
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-5 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#7c4dff] flex items-center justify-center text-white">
              <MdLocalLaundryService size={12} />
            </div>
            <span className="font-bold text-sm text-gray-800">LaundryPro</span>
            <span className="text-xs text-gray-400 ml-2">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-5 text-xs text-gray-400 font-medium">
            <button className="hover:text-[#7c4dff] transition-colors">Kebijakan Privasi</button>
            <button className="hover:text-[#7c4dff] transition-colors">Syarat & Ketentuan</button>
            <button className="hover:text-[#7c4dff] transition-colors">Hubungi Kami</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
