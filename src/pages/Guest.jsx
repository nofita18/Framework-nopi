import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdLocalLaundryService, MdLogin, MdPersonAdd, MdCheckCircle,
  MdArrowForward, MdPhone, MdLocationOn, MdEmail, MdMenu, MdClose,
  MdStar, MdAccessTime, MdLocalOffer, MdSpeed, MdVerified,
  MdSupportAgent, MdAppRegistration, MdDoneAll, MdLocalShipping,
  MdAttachMoney, MdHighQuality,
} from "react-icons/md";
import { FaTshirt, FaBolt, FaShoePrints, FaBed } from "react-icons/fa";

// ═══════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════

const navLinks = [
  { label: "Tentang",  id: "tentang"  },
  { label: "Layanan",  id: "layanan"  },
  { label: "Cara Kerja", id: "cara-kerja" },
  { label: "Kontak",   id: "kontak"   },
];

// PRD V2 — Cara Kerja (4 langkah)
const caraKerja = [
  { step: "01", icon: <MdAppRegistration size={28} />, title: "Daftar",            desc: "Buat akun gratis dalam 1 menit. Tidak perlu kartu kredit.",       color: "bg-[#7c4dff] text-white"    },
  { step: "02", icon: <FaTshirt size={28} />,          title: "Pilih Layanan",     desc: "Pilih jenis laundry sesuai kebutuhan: reguler, express, sepatu.",  color: "bg-[#ff6b81] text-white"    },
  { step: "03", icon: <MdLocalLaundryService size={28}/>,title:"Laundry Diproses", desc: "Kami ambil, cuci, setrika, dan kemas cucian Anda dengan rapi.",    color: "bg-amber-500 text-white"    },
  { step: "04", icon: <MdDoneAll size={28} />,          title: "Selesai",          desc: "Cucian bersih diantar kembali ke pintu Anda tepat waktu.",         color: "bg-emerald-500 text-white"  },
];

// PRD V2 — Statistik
const stats = [
  { value: "500+",  label: "Pelanggan",     sub: "Aktif & Puas"         },
  { value: "3.000+",label: "Order",         sub: "Berhasil Diselesaikan"},
  { value: "4.9",   label: "Rating",        sub: "Dari 5 Bintang"       },
  { value: "2 Jam", label: "Express",       sub: "Selesai Tercepat"     },
];

// PRD V2 — Keunggulan (4 poin sesuai PRD)
const keunggulan = [
  { icon: <MdAttachMoney size={28} />, title: "Harga Terjangkau",  desc: "Mulai Rp 7.000/kg, cocok untuk semua kalangan tanpa mengurangi kualitas.", color: "bg-purple-50 text-[#7c4dff]"  },
  { icon: <MdLocalShipping size={28}/>,title: "Antar Jemput",      desc: "Layanan pick-up & delivery gratis untuk radius 3 km. Tidak perlu keluar.", color: "bg-blue-50 text-blue-500"     },
  { icon: <MdSpeed size={28} />,       title: "Cepat",             desc: "Laundry express selesai 2–3 jam. Reguler maksimal 1 hari kerja.",          color: "bg-emerald-50 text-emerald-500"},
  { icon: <MdHighQuality size={28} />, title: "Berkualitas",       desc: "Detergen premium, mesin modern, dan penanganan ekstra hati-hati.",         color: "bg-pink-50 text-pink-500"     },
];

// PRD V2 — Testimoni (lebih lengkap dengan jabatan)
const testimonials = [
  { name: "Dewi Lestari",  initial: "D", rating: 5, text: "Cucian selalu bersih dan wangi, selesai tepat waktu. Sudah 2 tahun setia pakai LaundryPro!", role: "Member Gold"   },
  { name: "Andi Wijaya",   initial: "A", rating: 5, text: "Layanan express-nya keren banget, 2 jam langsung beres. Sangat membantu saat hari sibuk!",   role: "Member Silver" },
  { name: "Rina Marlina",  initial: "R", rating: 5, text: "Harga terjangkau, kualitas premium. Bed cover saya bersih dan harum setelah dicuci di sini.", role: "Member Gold"   },
  { name: "Fajar Nugroho", initial: "F", rating: 4, text: "Antar jemput gratisnya sangat membantu. Tidak perlu repot keluar rumah buat laundry!",        role: "Member Bronze" },
  { name: "Gita Purnama",  initial: "G", rating: 5, text: "Cuci sepatu hasilnya bersih banget! Sepatu putih saya kembali kayak baru. Recommended!",      role: "Pelanggan"     },
  { name: "Kevin Hartono", initial: "K", rating: 5, text: "Sistem tracking pesanan sangat membantu. Bisa pantau status cucian dari HP, praktis banget!",  role: "Member Silver" },
];

// Layanan (V1 dipertahankan)
const services = [
  { icon: <FaTshirt size={32} />,     name: "Laundry Reguler", price: "Rp 7.000 / kg",      desc: "Cuci & lipat dengan detergen premium. Selesai 1 hari kerja.", badge: "Terlaris",  badgeColor: "bg-[#7c4dff] text-white",  color: "bg-purple-50 text-[#7c4dff]", border: "border-[#7c4dff]/20" },
  { icon: <FaBolt size={32} />,       name: "Laundry Express", price: "Rp 12.000 / kg",     desc: "Selesai dalam 2–3 jam. Proses prioritas ekstra hati-hati.",   badge: "2–3 Jam",   badgeColor: "bg-[#ff6b81] text-white",  color: "bg-pink-50 text-[#ff6b81]",   border: "border-pink-200"             },
  { icon: <FaShoePrints size={32} />, name: "Cuci Sepatu",     price: "Rp 25.000 / pasang", desc: "Pembersihan menyeluruh, sikat khusus, hasil bersih maksimal.", badge: "Populer",   badgeColor: "bg-amber-500 text-white",  color: "bg-amber-50 text-amber-600",  border: "border-amber-200"            },
  { icon: <FaBed size={32} />,        name: "Bed Cover",       price: "Rp 20.000 / item",   desc: "Cuci bed cover & selimut besar. Bersih, wangi, bebas kuman.", badge: "Tersedia",  badgeColor: "bg-emerald-500 text-white",color: "bg-emerald-50 text-emerald-600",border: "border-emerald-200"           },
];

// ═══════════════════════════════════════════════════
// KOMPONEN UTAMA
// ═══════════════════════════════════════════════════
export default function Guest() {
  const navigate  = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 antialiased">

      {/* ══════════════════════════════════════
          TOP — BANNER PROMO (PRD V2 baru)
      ══════════════════════════════════════ */}
      <div className="bg-gradient-to-r from-[#7c4dff] to-[#9c6bff] text-white py-2.5 px-5 text-center text-xs font-semibold">
        <span className="inline-flex items-center gap-2 flex-wrap justify-center">
          🎉 Promo Pelanggan Baru: Diskon 20% untuk 3 transaksi pertama!
          <span className="inline-flex items-center gap-1 bg-white/20 border border-white/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
            <MdLocalShipping size={12} /> Gratis Antar Jemput
          </span>
          <button
            onClick={() => navigate("/register")}
            className="underline underline-offset-2 hover:text-white/80 transition-colors"
          >
            Daftar Sekarang →
          </button>
        </span>
      </div>

      {/* ══════════════════════════════════════
          TOP — NAVBAR (V1 + nav item baru)
      ══════════════════════════════════════ */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto h-16 px-5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#7c4dff] flex items-center justify-center text-white shadow-md shadow-[#7c4dff]/20">
              <MdLocalLaundryService size={20} />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-gray-800">LaundryPro</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className="hover:text-[#7c4dff] transition-colors duration-200">
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => navigate("/login")}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-[#7c4dff] border-2 border-[#7c4dff] rounded-xl hover:bg-[#7c4dff]/5 transition-all">
              <MdLogin size={16} /> Login
            </button>
            <button onClick={() => navigate("/register")}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#7c4dff] hover:bg-[#693ce6] rounded-xl transition-all shadow-md shadow-[#7c4dff]/25">
              <MdPersonAdd size={16} /> Register
            </button>
          </div>

          {/* Mobile */}
          <button className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-5 py-4 space-y-2">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className="block w-full text-left text-sm font-medium text-gray-600 py-2.5 border-b border-gray-50 hover:text-[#7c4dff] transition-colors">
                {link.label}
              </button>
            ))}
            <div className="flex gap-3 pt-3">
              <button onClick={() => navigate("/login")}
                className="flex-1 py-2.5 text-sm font-semibold text-[#7c4dff] border-2 border-[#7c4dff] rounded-xl">Login</button>
              <button onClick={() => navigate("/register")}
                className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#7c4dff] rounded-xl">Register</button>
            </div>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════
          TOP — HERO (V1 dipertahankan + badge baru)
      ══════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#1a103c] via-[#2d1b6b] to-[#4c2ca7] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7c4dff]/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#ff6b81]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        {/* Floating CRM card */}
        <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 w-72">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7c4dff] flex items-center justify-center text-white shrink-0">
                <MdLocalLaundryService size={20} />
              </div>
              <div>
                <p className="text-white font-bold text-sm">LaundryPro CRM</p>
                <p className="text-white/60 text-xs">Dashboard Real-time</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[["500+","Pelanggan"],["3.000+","Order"],["4.9★","Rating"],["2 Jam","Express"]].map(([v,l]) => (
                <div key={l} className="bg-white/10 rounded-xl p-3">
                  <p className="text-white font-extrabold text-base">{v}</p>
                  <p className="text-white/60 text-[10px] mt-0.5">{l}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-end h-14 pt-2 border-t border-white/10">
              {[55, 75, 48, 88, 65, 90, 42].map((h, i) => (
                <div key={i} className="flex flex-col justify-end h-full flex-1 px-0.5">
                  <div className="w-full rounded-full bg-gradient-to-t from-[#7c4dff] to-[#c4b5fd]" style={{ height: `${h}%` }} />
                </div>
              ))}
            </div>
            <p className="text-white/50 text-[10px] text-center">Laundry Overview — Minggu Ini</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-5 py-20 md:py-28 relative z-10">
          <div className="max-w-xl">
            {/* Badge promo V2 */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-[#ff6b81]/90 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                <MdLocalOffer size={13} /> Promo Pelanggan Baru — Diskon 20%
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                <MdLocalShipping size={13} /> Gratis Antar Jemput
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
              Laundry Bersih,{" "}
              <span className="text-[#c4b5fd]">Cepat</span>,{" "}
              <br className="hidden md:block" />
              dan <span className="text-[#c4b5fd]">Terpercaya</span>
            </h1>
            <p className="text-[#f0ebfa]/85 text-base leading-relaxed mb-8">
              LaundryPro hadir untuk membantu Anda dengan layanan cuci berkualitas tinggi, pengerjaan tepat waktu, dan harga yang terjangkau. Nikmati kemudahan laundry profesional langsung dari genggaman Anda.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <button onClick={() => navigate("/login")}
                className="flex items-center gap-2 bg-white text-[#7c4dff] hover:bg-purple-50 font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg">
                <MdLogin size={18} /> Login
              </button>
              <button onClick={() => navigate("/register")}
                className="flex items-center gap-2 bg-[#7c4dff] hover:bg-[#693ce6] border-2 border-white/20 text-white font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-[#7c4dff]/30">
                <MdPersonAdd size={18} /> Register Sekarang
              </button>
            </div>

            <div className="flex flex-wrap gap-6">
              {[["500+","Pelanggan Aktif"],["4.9 ★","Rating Kepuasan"],["2 Jam","Layanan Express"]].map(([val, label]) => (
                <div key={label}>
                  <span className="text-xl font-extrabold text-white">{val}</span>
                  <p className="text-xs text-white/60 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MIDDLE — TENTANG (V1 dipertahankan)
      ══════════════════════════════════════ */}
      <section id="tentang" className="py-20 px-5 bg-[#f6f4fb]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block bg-[#7c4dff]/10 text-[#7c4dff] text-xs font-bold px-3 py-1.5 rounded-full mb-4">Tentang Kami</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight mb-4">
                Mengapa Memilih <span className="text-[#7c4dff]">LaundryPro</span>?
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                LaundryPro adalah layanan laundry profesional yang berdiri sejak 2022 di Pekanbaru. Kami berkomitmen memberikan pengalaman laundry terbaik dengan teknologi modern, detergen premium ramah lingkungan, dan sistem manajemen digital yang transparan.
              </p>
              <button onClick={() => navigate("/register")}
                className="flex items-center gap-2 bg-[#7c4dff] hover:bg-[#693ce6] text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-[#7c4dff]/20">
                Mulai Sekarang <MdArrowForward size={16} />
              </button>
            </div>
            {/* PRD V2 — Keunggulan: Harga Terjangkau, Antar Jemput, Cepat, Berkualitas */}
            <div className="grid grid-cols-2 gap-4">
              {keunggulan.map((k, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default">
                  <div className={`w-12 h-12 rounded-xl ${k.color} flex items-center justify-center mb-3`}>{k.icon}</div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1">{k.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{k.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TAHAP 3 — STATISTIK (PRD V2 baru)
      ══════════════════════════════════════ */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#7c4dff]/10 text-[#7c4dff] text-xs font-bold px-3 py-1.5 rounded-full mb-3">Dalam Angka</span>
            <h2 className="text-3xl font-extrabold text-gray-800">LaundryPro dalam Angka</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <div key={i}
                className="relative bg-gradient-to-br from-[#f6f4fb] to-white rounded-2xl p-7 border border-[#efecf7] text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                {/* glow effect on hover */}
                <div className="absolute inset-0 bg-[#7c4dff]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <p className="text-4xl font-extrabold text-[#7c4dff] mb-1 relative z-10">{s.value}</p>
                <p className="font-bold text-gray-800 text-sm relative z-10">{s.label}</p>
                <p className="text-xs text-gray-400 mt-1 relative z-10">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          LAYANAN (V1 dipertahankan + hover effect)
      ══════════════════════════════════════ */}
      <section id="layanan" className="py-20 px-5 bg-[#f6f4fb]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#7c4dff]/10 text-[#7c4dff] text-xs font-bold px-3 py-1.5 rounded-full mb-3">Layanan Kami</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">Pilihan Layanan Lengkap</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">Kami menyediakan berbagai layanan laundry untuk memenuhi semua kebutuhan Anda.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div key={i}
                className={`group bg-white rounded-2xl border-2 ${s.border} p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col cursor-pointer`}>
                <div className="flex justify-between items-start mb-5">
                  <div className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {s.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${s.badgeColor}`}>{s.badge}</span>
                </div>
                <h3 className="font-extrabold text-gray-800 text-base mb-2">{s.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4">{s.desc}</p>
                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <p className="text-lg font-extrabold text-[#7c4dff]">{s.price}</p>
                  <span className="text-[#7c4dff] opacity-0 group-hover:opacity-100 transition-opacity">
                    <MdArrowForward size={18} />
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={() => navigate("/register")}
                className="flex items-center gap-2 bg-[#7c4dff] hover:bg-[#693ce6] text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md">
                <MdPersonAdd size={16} /> Daftar & Pesan Sekarang
              </button>
              <button onClick={() => navigate("/login")}
                className="flex items-center gap-2 border-2 border-[#7c4dff] text-[#7c4dff] font-semibold px-6 py-3 rounded-xl hover:bg-[#7c4dff]/5 transition-all">
                <MdLogin size={16} /> Login untuk Pesan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TAHAP 1 — CARA KERJA (PRD V2 baru)
      ══════════════════════════════════════ */}
      <section id="cara-kerja" className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-[#7c4dff]/10 text-[#7c4dff] text-xs font-bold px-3 py-1.5 rounded-full mb-3">Cara Kerja</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">Laundry Jadi Mudah, <span className="text-[#7c4dff]">4 Langkah</span> Saja</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">Proses yang simpel dan transparan dari awal hingga cucian kembali ke tangan Anda.</p>
          </div>

          {/* Step cards dengan connector line */}
          <div className="relative">
            {/* Connector line — desktop only */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#7c4dff] via-[#ff6b81] to-emerald-500 z-0" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {caraKerja.map((step, i) => (
                <div key={i} className="group flex flex-col items-center text-center">
                  {/* Icon circle */}
                  <div className={`w-20 h-20 rounded-full ${step.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300 ring-4 ring-white`}>
                    {step.icon}
                  </div>
                  {/* Step number */}
                  <span className="text-[10px] font-extrabold text-gray-300 tracking-widest mb-1">LANGKAH {step.step}</span>
                  <h3 className="font-extrabold text-gray-800 text-base mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <button onClick={() => navigate("/register")}
              className="flex items-center gap-2 mx-auto bg-[#7c4dff] hover:bg-[#693ce6] text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-[#7c4dff]/25">
              <MdPersonAdd size={18} /> Mulai Sekarang — Gratis
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TAHAP 2 — TESTIMONI (PRD V2 diperluas)
      ══════════════════════════════════════ */}
      <section className="py-20 px-5 bg-[#f6f4fb]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#7c4dff]/10 text-[#7c4dff] text-xs font-bold px-3 py-1.5 rounded-full mb-3">Testimoni</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">Apa Kata Pelanggan Kami</h2>
            <p className="text-sm text-gray-500">Bergabung dengan 500+ pelanggan puas yang telah mempercayakan laundry mereka</p>
            {/* Rating summary */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {[...Array(5)].map((_, i) => <MdStar key={i} className="text-yellow-400" size={20} />)}
              <span className="font-extrabold text-gray-800 ml-1">4.9</span>
              <span className="text-sm text-gray-400">/ 5 dari 500+ ulasan</span>
            </div>
          </div>

          {/* Grid 3 kolom x 2 baris */}
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, j) => <MdStar key={j} className="text-yellow-400" size={15} />)}
                </div>
                {/* Review */}
                <p className="text-sm text-gray-600 italic leading-relaxed flex-1 mb-5">"{t.text}"</p>
                {/* Author */}
                <div className="flex items-center gap-3 border-t border-gray-50 pt-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7c4dff] to-[#9c6bff] flex items-center justify-center font-bold text-white text-sm shrink-0">
                    {t.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-xs text-[#7c4dff] font-medium">{t.role}</p>
                  </div>
                  <MdCheckCircle className="text-emerald-500 shrink-0" size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BOTTOM — CTA (PRD V2: teks diperbarui)
      ══════════════════════════════════════ */}
      <section className="py-20 px-5 bg-gradient-to-br from-[#1a103c] via-[#2d1b6b] to-[#4c2ca7] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7c4dff]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff6b81]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-[#ff6b81]/80 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-5">
            <MdLocalOffer size={13} /> Promo Pelanggan Baru
          </span>
          {/* PRD V2 — CTA text diperbarui */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
            Bergabung Sekarang dan Dapatkan{" "}
            <span className="text-[#c4b5fd]">Promo Pelanggan Baru</span>
          </h2>
          <p className="text-[#f0ebfa]/80 text-sm leading-relaxed mb-3 max-w-xl mx-auto">
            Daftar gratis sekarang dan nikmati <strong className="text-white">diskon 20%</strong> untuk 3 transaksi pertama, plus <strong className="text-white">gratis antar jemput</strong> untuk radius 3 km!
          </p>
          {/* Promo badges */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {["✅ Diskon 20% 3 Transaksi Pertama", "🚚 Gratis Antar Jemput", "⭐ Poin Reward Langsung"].map((b) => (
              <span key={b} className="bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">{b}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => navigate("/register")}
              className="flex items-center gap-2 bg-white text-[#7c4dff] hover:bg-purple-50 font-extrabold px-8 py-4 rounded-xl transition-all shadow-xl text-sm">
              <MdPersonAdd size={20} /> Daftar Gratis Sekarang
            </button>
            <button onClick={() => navigate("/login")}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-all text-sm">
              <MdLogin size={20} /> Sudah Punya Akun? Login
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER (V1 dipertahankan)
      ══════════════════════════════════════ */}
      <footer id="kontak" className="bg-[#0f0a24] text-white">
        <div className="max-w-6xl mx-auto px-5 py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#7c4dff] flex items-center justify-center shadow-md shadow-[#7c4dff]/30">
                  <MdLocalLaundryService size={20} />
                </div>
                <span className="font-extrabold text-lg tracking-tight">LaundryPro</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Layanan laundry profesional dengan kualitas terbaik, harga terjangkau, dan pengerjaan tepat waktu. Kepuasan Anda adalah prioritas kami.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4 text-white/90">Layanan</h4>
              <ul className="space-y-2.5 text-sm text-white/60">
                {["Laundry Reguler","Laundry Express","Cuci Sepatu","Bed Cover"].map((l) => (
                  <li key={l}>
                    <button onClick={() => scrollTo("layanan")} className="hover:text-[#c4b5fd] transition-colors text-left">{l}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4 text-white/90">Kontak</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-start gap-2.5">
                  <MdLocationOn className="text-[#7c4dff] shrink-0 mt-0.5" size={16} />
                  <span>Jl. Sudirman No. 45, Pekanbaru, Riau 28111</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <MdPhone className="text-[#7c4dff] shrink-0" size={16} />
                  <span>0812-3456-7890</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <MdEmail className="text-[#7c4dff] shrink-0" size={16} />
                  <span>halo@laundrypro.id</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <MdAccessTime className="text-[#7c4dff] shrink-0" size={16} />
                  <span>08.00 – 21.00 WIB (Setiap hari)</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/40">© {new Date().getFullYear()} LaundryPro. Hak Cipta Dilindungi.</p>
            <div className="flex gap-5 text-xs text-white/40">
              <button className="hover:text-white/70 transition-colors">Kebijakan Privasi</button>
              <button className="hover:text-white/70 transition-colors">Syarat & Ketentuan</button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
