import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdLocalLaundryService, MdLogin, MdPersonAdd, MdCheckCircle,
  MdArrowForward, MdPhone, MdLocationOn, MdEmail, MdMenu, MdClose,
  MdStar, MdAccessTime, MdLocalOffer, MdSpeed, MdSupportAgent,
  MdAppRegistration, MdDoneAll, MdLocalShipping, MdAttachMoney,
  MdHighQuality, MdTrackChanges, MdNotifications, MdHistory,
  MdCardMembership, MdWhatsapp, MdExpandMore, MdExpandLess,
  MdCalendarToday, MdPayment, MdShare, MdChevronLeft, MdChevronRight,
  MdShoppingCart, MdKeyboardArrowRight,
} from "react-icons/md";
import { FaTshirt, FaBolt, FaShoePrints, FaBed } from "react-icons/fa";

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════

const navLinks = [
  { label: "Fitur",     id: "fitur"     },
  { label: "Layanan",   id: "layanan"   },
  { label: "Cara Kerja",id: "cara-kerja"},
  { label: "FAQ",       id: "faq"       },
  { label: "Kontak",    id: "kontak"    },
];

// PRD V3 — Fitur CRM
const fiturCRM = [
  {
    icon: <MdTrackChanges size={32} />,
    title: "Tracking Status Laundry",
    desc: "Pantau posisi cucian Anda secara real-time: Diterima → Dicuci → Disetrika → Siap Diambil → Selesai. Tidak perlu tanya-tanya lagi.",
    color: "bg-[#7c4dff]",
    light: "bg-purple-50 text-[#7c4dff]",
    steps: ["Diterima","Dicuci","Disetrika","Siap","Selesai"],
    activeStep: 3,
  },
  {
    icon: <MdNotifications size={32} />,
    title: "Reminder Pengambilan",
    desc: "Dapatkan notifikasi otomatis via WhatsApp ketika cucian sudah siap diambil. Tidak ada lagi cucian yang terlupakan.",
    color: "bg-[#ff6b81]",
    light: "bg-pink-50 text-[#ff6b81]",
    badge: "WhatsApp Notif",
  },
  {
    icon: <MdHistory size={32} />,
    title: "Riwayat Transaksi",
    desc: "Seluruh riwayat pesanan tersimpan rapi. Lihat detail, total biaya, dan status setiap transaksi kapan saja.",
    color: "bg-amber-500",
    light: "bg-amber-50 text-amber-600",
    orders: [
      { id: "TRX-001", svc: "Cuci Kiloan", status: "Selesai" },
      { id: "TRX-002", svc: "Laundry Express", status: "Diproses" },
    ],
  },
  {
    icon: <MdCardMembership size={32} />,
    title: "Loyalty Member",
    desc: "Kumpulkan poin reward di setiap transaksi. Tukar poin untuk diskon eksklusif dan upgrade ke tier Gold.",
    color: "bg-emerald-500",
    light: "bg-emerald-50 text-emerald-600",
    tiers: ["Bronze","Silver","Gold"],
  },
  {
    icon: <MdCalendarToday size={32} />,
    title: "Notifikasi Status",
    desc: "Terima update otomatis di setiap perubahan status laundry. Selalu tahu perkembangan cucian Anda.",
    color: "bg-blue-500",
    light: "bg-blue-50 text-blue-600",
  },
];

// PRD V2 — Cara Kerja
const caraKerja = [
  { step: "01", icon: <MdAppRegistration size={28} />, title: "Daftar",          desc: "Buat akun gratis dalam 1 menit. Tidak perlu kartu kredit.", color: "bg-[#7c4dff] text-white"  },
  { step: "02", icon: <FaTshirt size={28} />,          title: "Pilih Layanan",   desc: "Pilih jenis laundry sesuai kebutuhan: reguler, express, sepatu.", color: "bg-[#ff6b81] text-white" },
  { step: "03", icon: <MdLocalLaundryService size={28}/>,title:"Laundry Diproses",desc: "Kami ambil, cuci, setrika, dan kemas cucian Anda dengan rapi.", color: "bg-amber-500 text-white" },
  { step: "04", icon: <MdDoneAll size={28} />,          title: "Selesai",        desc: "Cucian bersih diantar kembali ke pintu Anda tepat waktu.",     color: "bg-emerald-500 text-white"},
];

// PRD V2 — Statistik
const stats = [
  { value: "500+",   label: "Pelanggan",  sub: "Aktif & Puas"          },
  { value: "3.000+", label: "Order",      sub: "Berhasil Diselesaikan" },
  { value: "4.9",    label: "Rating",     sub: "Dari 5 Bintang"        },
  { value: "2 Jam",  label: "Express",    sub: "Selesai Tercepat"      },
];

// PRD V2 — Keunggulan
const keunggulan = [
  { icon: <MdAttachMoney size={28} />, title: "Harga Terjangkau", desc: "Mulai Rp 7.000/kg, cocok untuk semua kalangan tanpa mengurangi kualitas.", color: "bg-purple-50 text-[#7c4dff]" },
  { icon: <MdLocalShipping size={28}/>,title: "Antar Jemput",     desc: "Layanan pick-up & delivery gratis untuk radius 3 km. Tidak perlu keluar.",  color: "bg-blue-50 text-blue-500"    },
  { icon: <MdSpeed size={28} />,       title: "Cepat",            desc: "Laundry express selesai 2–3 jam. Reguler maksimal 1 hari kerja.",           color: "bg-emerald-50 text-emerald-500"},
  { icon: <MdHighQuality size={28} />, title: "Berkualitas",      desc: "Detergen premium, mesin modern, dan penanganan ekstra hati-hati.",          color: "bg-pink-50 text-pink-500"     },
];

// Layanan (V1+V2)
const services = [
  { icon: <FaTshirt size={32} />,     name: "Laundry Reguler", price: "Rp 7.000 / kg",      desc: "Cuci & lipat dengan detergen premium. Selesai 1 hari kerja.", badge: "Terlaris",  badgeColor: "bg-[#7c4dff] text-white",  color: "bg-purple-50 text-[#7c4dff]", border: "border-[#7c4dff]/20" },
  { icon: <FaBolt size={32} />,       name: "Laundry Express", price: "Rp 12.000 / kg",     desc: "Selesai dalam 2–3 jam. Proses prioritas ekstra hati-hati.",   badge: "2–3 Jam",   badgeColor: "bg-[#ff6b81] text-white",  color: "bg-pink-50 text-[#ff6b81]",   border: "border-pink-200"             },
  { icon: <FaShoePrints size={32} />, name: "Cuci Sepatu",     price: "Rp 25.000 / pasang", desc: "Pembersihan menyeluruh, sikat khusus, hasil bersih maksimal.", badge: "Populer",   badgeColor: "bg-amber-500 text-white",  color: "bg-amber-50 text-amber-600",  border: "border-amber-200"            },
  { icon: <FaBed size={32} />,        name: "Bed Cover",       price: "Rp 20.000 / item",   desc: "Cuci bed cover & selimut besar. Bersih, wangi, bebas kuman.", badge: "Tersedia",  badgeColor: "bg-emerald-500 text-white",color: "bg-emerald-50 text-emerald-600",border: "border-emerald-200"          },
];

// PRD V3 — FAQ
const faqData = [
  { q: "Berapa lama proses laundry reguler?",             a: "Laundry reguler selesai dalam 1 hari kerja (maksimal 24 jam). Anda akan mendapat notifikasi WhatsApp ketika cucian sudah siap diambil." },
  { q: "Apakah ada layanan antar jemput?",                a: "Ya! Kami menyediakan layanan antar jemput gratis untuk radius 3 km dari lokasi kami. Untuk jarak lebih jauh, ada biaya tambahan sesuai jarak." },
  { q: "Bagaimana cara memantau status laundry saya?",    a: "Setelah login ke akun LaundryPro, Anda bisa tracking status cucian secara real-time dari menu Pesanan. Status diperbarui otomatis di setiap tahap pengerjaan." },
  { q: "Apa itu program Loyalty Member?",                 a: "Setiap transaksi memberikan poin reward. Kumpulkan poin untuk naik tier (Bronze → Silver → Gold) dan dapatkan diskon eksklusif, cashback, serta layanan prioritas." },
  { q: "Apakah cucian saya aman?",                        a: "Cucian Anda ditangani dengan prosedur ketat. Setiap item dicatat, difoto, dan dikemas rapi. Kami bertanggung jawab atas setiap cucian yang masuk." },
  { q: "Bagaimana jika ada masalah dengan cucian?",       a: "Ajukan komplain langsung lewat fitur Tiket Bantuan di aplikasi. Tim CS kami merespons dalam 1x24 jam dan akan menyelesaikan masalah secepatnya." },
];

// PRD V2+V3 — Testimoni (6 reviews)
const testimonials = [
  { name: "Dewi Lestari",  initial: "D", rating: 5, text: "Cucian selalu bersih dan wangi, selesai tepat waktu. Fitur tracking status laundry-nya keren banget!", role: "Member Gold"   },
  { name: "Andi Wijaya",   initial: "A", rating: 5, text: "Layanan express-nya 2 jam langsung beres. Notifikasi WhatsApp-nya sangat membantu, tidak perlu nanya lagi!", role: "Member Silver" },
  { name: "Rina Marlina",  initial: "R", rating: 5, text: "Harga terjangkau, kualitas premium. Poin reward-nya bisa ditukar diskon, makin hemat pakai LaundryPro!", role: "Member Gold"   },
  { name: "Fajar Nugroho", initial: "F", rating: 4, text: "Antar jemput gratisnya sangat membantu. Tidak perlu repot keluar rumah buat laundry lagi!", role: "Member Bronze" },
  { name: "Gita Purnama",  initial: "G", rating: 5, text: "Cuci sepatu hasilnya bersih banget! Aplikasinya mudah dipakai dan riwayat transaksi tersimpan rapi.", role: "Pelanggan"     },
  { name: "Kevin Hartono", initial: "K", rating: 5, text: "Sistem tracking pesanannya sangat membantu. Bisa pantau status cucian dari HP, praktis sekali!", role: "Member Silver" },
];

// PRD V3 — Partner / Payment logos (text-based)
const partners = [
  { name: "GoPay",    color: "text-blue-600",   bg: "bg-blue-50"   },
  { name: "OVO",      color: "text-purple-600", bg: "bg-purple-50" },
  { name: "DANA",     color: "text-blue-500",   bg: "bg-blue-50"   },
  { name: "BCA",      color: "text-blue-800",   bg: "bg-blue-50"   },
  { name: "Mandiri",  color: "text-yellow-600", bg: "bg-yellow-50" },
  { name: "BRI",      color: "text-blue-700",   bg: "bg-blue-50"   },
  { name: "QRIS",     color: "text-gray-700",   bg: "bg-gray-50"   },
  { name: "Transfer", color: "text-emerald-600",bg: "bg-emerald-50"},
];

const socialLinks = [
  { name: "WhatsApp", icon: <MdWhatsapp size={20} />, color: "bg-emerald-500 hover:bg-emerald-600", href: "https://wa.me/6281234567890" },
  { name: "Instagram",icon: <MdShare size={20} />,    color: "bg-pink-500 hover:bg-pink-600",       href: "#" },
  { name: "TikTok",   icon: <MdShare size={20} />,    color: "bg-gray-800 hover:bg-gray-900",       href: "#" },
];

// ═══════════════════════════════════════════════════════════════
// FAQ ITEM
// ═══════════════════════════════════════════════════════════════
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? "border-[#7c4dff]/40 shadow-md shadow-[#7c4dff]/5" : "border-gray-100"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/50 transition-colors"
      >
        <span className="font-semibold text-gray-800 text-sm pr-4">{q}</span>
        <span className={`shrink-0 transition-transform duration-300 ${open ? "rotate-0" : ""}`}>
          {open
            ? <MdExpandLess className="text-[#7c4dff]" size={22} />
            : <MdExpandMore className="text-gray-400" size={22} />}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// KOMPONEN UTAMA
// ═══════════════════════════════════════════════════════════════
export default function Guest() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Slider helpers — 3 testimoni per tampilan (desktop)
  const prevSlide = () => setTestimonialIdx((p) => Math.max(0, p - 1));
  const nextSlide = () => setTestimonialIdx((p) => Math.min(testimonials.length - 1, p + 1));
  const visibleTestimonials = testimonials.slice(testimonialIdx, testimonialIdx + 3).concat(
    testimonialIdx + 3 > testimonials.length
      ? testimonials.slice(0, (testimonialIdx + 3) - testimonials.length)
      : []
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 antialiased">

      {/* ══════════════════════════════════════════
          BANNER PROMO (V2)
      ══════════════════════════════════════════ */}
      <div className="bg-gradient-to-r from-[#7c4dff] to-[#9c6bff] text-white py-2.5 px-5 text-center text-xs font-semibold">
        <span className="inline-flex items-center gap-2 flex-wrap justify-center">
          🎉 Promo Pelanggan Baru: Diskon 20% untuk 3 transaksi pertama!
          <span className="inline-flex items-center gap-1 bg-white/20 border border-white/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
            <MdLocalShipping size={12} /> Gratis Antar Jemput
          </span>
          <button onClick={() => navigate("/register")} className="underline hover:text-white/80 transition-colors">
            Daftar Sekarang →
          </button>
        </span>
      </div>

      {/* ══════════════════════════════════════════
          NAVBAR (V1+V2+V3)
      ══════════════════════════════════════════ */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto h-16 px-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#7c4dff] flex items-center justify-center text-white shadow-md shadow-[#7c4dff]/20">
              <MdLocalLaundryService size={20} />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-gray-800">LaundryPro</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className="hover:text-[#7c4dff] transition-colors duration-200">{link.label}</button>
            ))}
          </nav>

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

      {/* ══════════════════════════════════════════
          HERO — headline V3 + CTA Pesan Sekarang
      ══════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#1a103c] via-[#2d1b6b] to-[#4c2ca7] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7c4dff]/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#ff6b81]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        {/* Floating CRM card */}
        <div className="hidden lg:block absolute right-14 top-1/2 -translate-y-1/2 w-[280px]">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7c4dff] flex items-center justify-center text-white shrink-0">
                <MdLocalLaundryService size={20} />
              </div>
              <div>
                <p className="text-white font-bold text-sm">LaundryPro CRM</p>
                <p className="text-white/60 text-xs">Tracking Real-time</p>
              </div>
            </div>
            {/* Status tracker mini */}
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-white/70 text-[10px] font-bold mb-2">STATUS CUCIAN — TRX-001</p>
              <div className="flex items-center gap-1">
                {["Diterima","Dicuci","Siap","Selesai"].map((s, i) => (
                  <div key={s} className="flex items-center flex-1">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 mx-auto ${i <= 2 ? "bg-white text-[#7c4dff]" : "bg-white/20 text-white/40"}`}>
                      {i < 2 ? "✓" : i + 1}
                    </div>
                    {i < 3 && <div className={`h-0.5 flex-1 ${i < 2 ? "bg-white" : "bg-white/20"}`} />}
                  </div>
                ))}
              </div>
              <p className="text-white/60 text-[9px] mt-2 text-center">● Siap Diambil — Notifikasi terkirim</p>
            </div>
            {/* Stats mini */}
            <div className="grid grid-cols-2 gap-2">
              {[["500+","Pelanggan"],["3.000+","Order"],["4.9★","Rating"],["2 Jam","Express"]].map(([v,l]) => (
                <div key={l} className="bg-white/10 rounded-xl p-2.5">
                  <p className="text-white font-extrabold text-sm">{v}</p>
                  <p className="text-white/60 text-[10px]">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-5 py-20 md:py-28 relative z-10">
          <div className="max-w-xl">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-[#ff6b81]/90 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                <MdLocalOffer size={13} /> Promo Pelanggan Baru — Diskon 20%
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                <MdLocalShipping size={13} /> Gratis Antar Jemput
              </span>
            </div>

            {/* PRD V3 — Headline baru */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
              Laundry Digital{" "}
              <br className="hidden md:block" />
              dengan{" "}
              <span className="text-[#c4b5fd]">Tracking</span> dan{" "}
              <span className="text-[#c4b5fd]">Reminder</span>{" "}
              Otomatis
            </h1>

            <p className="text-[#f0ebfa]/85 text-base leading-relaxed mb-8">
              LaundryPro bukan sekadar laundry biasa. Pantau status cucian secara real-time, terima notifikasi otomatis, kumpulkan reward point, dan kelola semua pesanan dari satu aplikasi.
            </p>

            {/* PRD V3 — 3 CTA: Login, Register, Pesan Sekarang */}
            <div className="flex flex-wrap gap-3 mb-10">
              <button onClick={() => navigate("/login")}
                className="flex items-center gap-2 bg-white text-[#7c4dff] hover:bg-purple-50 font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg text-sm">
                <MdLogin size={18} /> Login
              </button>
              <button onClick={() => navigate("/register")}
                className="flex items-center gap-2 bg-[#7c4dff] hover:bg-[#693ce6] border-2 border-white/20 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-[#7c4dff]/30 text-sm">
                <MdPersonAdd size={18} /> Register
              </button>
              <button onClick={() => scrollTo("layanan")}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm">
                <MdShoppingCart size={18} /> Pesan Sekarang
              </button>
            </div>

            <div className="flex flex-wrap gap-6">
              {[["500+","Pelanggan"],["4.9 ★","Rating"],["2 Jam","Express"]].map(([v,l]) => (
                <div key={l}>
                  <p className="text-xl font-extrabold text-white">{v}</p>
                  <p className="text-xs text-white/60 mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TAHAP 1 — FITUR CRM (PRD V3 baru)
      ══════════════════════════════════════════ */}
      <section id="fitur" className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-[#7c4dff]/10 text-[#7c4dff] text-xs font-bold px-3 py-1.5 rounded-full mb-3">Fitur CRM Digital</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
              Semua Dalam <span className="text-[#7c4dff]">Satu Aplikasi</span>
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">
              LaundryPro dilengkapi sistem CRM canggih yang memudahkan Anda memantau dan mengelola laundry secara digital.
            </p>
          </div>

          <div className="space-y-6">
            {/* Row 1 — Tracking + Reminder (2 besar) */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Tracking Status */}
              <div className="group bg-gradient-to-br from-[#f6f4fb] to-white rounded-2xl border border-[#efecf7] p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl ${fiturCRM[0].light} flex items-center justify-center mb-5`}>
                  {fiturCRM[0].icon}
                </div>
                <h3 className="font-extrabold text-gray-800 text-lg mb-2">{fiturCRM[0].title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{fiturCRM[0].desc}</p>
                {/* Live tracker demo */}
                <div className="bg-white rounded-xl border border-[#efecf7] p-4">
                  <p className="text-[10px] font-bold text-gray-400 mb-3 tracking-wider">STATUS REAL-TIME</p>
                  <div className="flex items-center gap-1">
                    {fiturCRM[0].steps.map((s, i) => (
                      <div key={s} className="flex items-center flex-1">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mx-auto transition-all ${i < fiturCRM[0].activeStep ? "bg-[#7c4dff] text-white" : i === fiturCRM[0].activeStep ? "bg-[#ff6b81] text-white ring-4 ring-[#ff6b81]/20" : "bg-gray-100 text-gray-400"}`}>
                          {i < fiturCRM[0].activeStep ? "✓" : i + 1}
                        </div>
                        {i < fiturCRM[0].steps.length - 1 && (
                          <div className={`h-0.5 flex-1 ${i < fiturCRM[0].activeStep ? "bg-[#7c4dff]" : "bg-gray-200"}`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-5 mt-2 text-[8px] text-center text-gray-400">
                    {fiturCRM[0].steps.map((s, i) => (
                      <span key={s} className={i < fiturCRM[0].activeStep ? "text-[#7c4dff] font-bold" : i === fiturCRM[0].activeStep ? "text-[#ff6b81] font-extrabold" : ""}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reminder Pengambilan */}
              <div className="group bg-gradient-to-br from-pink-50 to-white rounded-2xl border border-pink-100 p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl ${fiturCRM[1].light} flex items-center justify-center mb-5`}>
                  {fiturCRM[1].icon}
                </div>
                <h3 className="font-extrabold text-gray-800 text-lg mb-2">{fiturCRM[1].title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{fiturCRM[1].desc}</p>
                {/* WhatsApp notif demo */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                      <MdWhatsapp size={16} />
                    </div>
                    <div className="bg-emerald-50 rounded-xl rounded-tl-none p-3 flex-1">
                      <p className="text-[10px] font-bold text-emerald-700 mb-1">LaundryPro</p>
                      <p className="text-xs text-gray-700">✅ Cucian Anda <strong>sudah siap diambil!</strong><br />No. Order: TRX-001<br />Laundry Kiloan — 3 kg</p>
                      <p className="text-[9px] text-gray-400 mt-1">Hari ini, 14:32</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 — Riwayat + Loyalty + Notifikasi (3 kolom) */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Riwayat Transaksi */}
              <div className="group bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`w-12 h-12 rounded-2xl ${fiturCRM[2].light} flex items-center justify-center mb-4`}>
                  {fiturCRM[2].icon}
                </div>
                <h3 className="font-extrabold text-gray-800 text-base mb-2">{fiturCRM[2].title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{fiturCRM[2].desc}</p>
                <div className="space-y-2">
                  {fiturCRM[2].orders.map((o) => (
                    <div key={o.id} className="flex items-center justify-between bg-white rounded-xl px-3 py-2 border border-gray-100 text-xs">
                      <div>
                        <p className="font-bold text-gray-700">{o.svc}</p>
                        <p className="text-gray-400 font-mono">{o.id}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${o.status === "Selesai" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {o.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loyalty Member */}
              <div className="group bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`w-12 h-12 rounded-2xl ${fiturCRM[3].light} flex items-center justify-center mb-4`}>
                  {fiturCRM[3].icon}
                </div>
                <h3 className="font-extrabold text-gray-800 text-base mb-2">{fiturCRM[3].title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{fiturCRM[3].desc}</p>
                <div className="flex gap-2">
                  {[["🥉","Bronze","amber"],["🥈","Silver","gray"],["🥇","Gold","yellow"]].map(([ico, tier, col]) => (
                    <div key={tier} className={`flex-1 text-center rounded-xl p-2 border ${col === "yellow" ? "border-yellow-300 bg-yellow-50" : "border-gray-100 bg-gray-50"}`}>
                      <p className="text-lg">{ico}</p>
                      <p className={`text-[10px] font-bold ${col === "yellow" ? "text-yellow-700" : "text-gray-500"}`}>{tier}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notifikasi Status */}
              <div className="group bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`w-12 h-12 rounded-2xl ${fiturCRM[4].light} flex items-center justify-center mb-4`}>
                  {fiturCRM[4].icon}
                </div>
                <h3 className="font-extrabold text-gray-800 text-base mb-2">{fiturCRM[4].title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{fiturCRM[4].desc}</p>
                <div className="space-y-1.5">
                  {[
                    { dot: "bg-[#7c4dff]", msg: "Pesanan diterima" },
                    { dot: "bg-blue-500",  msg: "Sedang dicuci" },
                    { dot: "bg-[#ff6b81]", msg: "Siap diambil ✓" },
                  ].map((n, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-100 text-xs">
                      <span className={`w-2 h-2 rounded-full ${n.dot} shrink-0`} />
                      <span className="text-gray-600">{n.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <button onClick={() => navigate("/register")}
              className="flex items-center gap-2 mx-auto bg-[#7c4dff] hover:bg-[#693ce6] text-white font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-[#7c4dff]/25 text-sm">
              <MdPersonAdd size={18} /> Coba Semua Fitur — Gratis
            </button>
          </div>
        </div>
      </section>

      {/* STATISTIK (V2) */}
      <section className="py-14 px-5 bg-[#f6f4fb]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <div key={i} className="relative bg-white rounded-2xl p-7 border border-[#efecf7] text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group cursor-default">
              <div className="absolute inset-0 bg-[#7c4dff]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <p className="text-4xl font-extrabold text-[#7c4dff] mb-1 relative z-10">{s.value}</p>
              <p className="font-bold text-gray-800 text-sm relative z-10">{s.label}</p>
              <p className="text-xs text-gray-400 mt-1 relative z-10">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TENTANG — KEUNGGULAN (V1+V2) */}
      <section id="tentang" className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block bg-[#7c4dff]/10 text-[#7c4dff] text-xs font-bold px-3 py-1.5 rounded-full mb-4">Tentang Kami</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight mb-4">
                Mengapa Memilih <span className="text-[#7c4dff]">LaundryPro</span>?
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                LaundryPro adalah layanan laundry profesional berbasis CRM yang berdiri sejak 2022 di Pekanbaru. Kami berkomitmen memberikan pengalaman laundry terbaik dengan teknologi digital, detergen premium ramah lingkungan, dan sistem manajemen transparan.
              </p>
              <button onClick={() => navigate("/register")}
                className="flex items-center gap-2 bg-[#7c4dff] hover:bg-[#693ce6] text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-[#7c4dff]/20">
                Mulai Sekarang <MdArrowForward size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {keunggulan.map((k, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl ${k.color} flex items-center justify-center mb-3`}>{k.icon}</div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1">{k.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{k.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LAYANAN (V1+V2) */}
      <section id="layanan" className="py-20 px-5 bg-[#f6f4fb]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#7c4dff]/10 text-[#7c4dff] text-xs font-bold px-3 py-1.5 rounded-full mb-3">Layanan Kami</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">Pilihan Layanan Lengkap</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">Kami menyediakan berbagai layanan laundry untuk memenuhi semua kebutuhan Anda.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div key={i} className={`group bg-white rounded-2xl border-2 ${s.border} p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col cursor-pointer`}>
                <div className="flex justify-between items-start mb-5">
                  <div className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>{s.icon}</div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${s.badgeColor}`}>{s.badge}</span>
                </div>
                <h3 className="font-extrabold text-gray-800 text-base mb-2">{s.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4">{s.desc}</p>
                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <p className="text-lg font-extrabold text-[#7c4dff]">{s.price}</p>
                  <span className="text-[#7c4dff] opacity-0 group-hover:opacity-100 transition-opacity"><MdArrowForward size={18} /></span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={() => navigate("/register")}
                className="flex items-center gap-2 bg-[#7c4dff] hover:bg-[#693ce6] text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md">
                <MdPersonAdd size={16} /> Daftar & Pesan
              </button>
              <button onClick={() => navigate("/login")}
                className="flex items-center gap-2 border-2 border-[#7c4dff] text-[#7c4dff] font-semibold px-6 py-3 rounded-xl hover:bg-[#7c4dff]/5 transition-all">
                <MdLogin size={16} /> Login untuk Pesan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CARA KERJA (V2) */}
      <section id="cara-kerja" className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-[#7c4dff]/10 text-[#7c4dff] text-xs font-bold px-3 py-1.5 rounded-full mb-3">Cara Kerja</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">Laundry Jadi Mudah, <span className="text-[#7c4dff]">4 Langkah</span> Saja</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">Proses simpel dan transparan dari awal hingga cucian kembali ke tangan Anda.</p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#7c4dff] via-[#ff6b81] to-emerald-500 z-0" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {caraKerja.map((step, i) => (
                <div key={i} className="group flex flex-col items-center text-center">
                  <div className={`w-20 h-20 rounded-full ${step.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300 ring-4 ring-white`}>
                    {step.icon}
                  </div>
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

      {/* ══════════════════════════════════════════
          TAHAP 2 — TESTIMONI SLIDER (PRD V3)
      ══════════════════════════════════════════ */}
      <section className="py-20 px-5 bg-[#f6f4fb] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="inline-block bg-[#7c4dff]/10 text-[#7c4dff] text-xs font-bold px-3 py-1.5 rounded-full mb-3">Testimoni</span>
              <h2 className="text-3xl font-extrabold text-gray-800 mb-1">Apa Kata Pelanggan Kami</h2>
              <div className="flex items-center gap-2 mt-2">
                {[...Array(5)].map((_, i) => <MdStar key={i} className="text-yellow-400" size={18} />)}
                <span className="font-extrabold text-gray-800 ml-1">4.9</span>
                <span className="text-sm text-gray-400">dari 500+ ulasan</span>
              </div>
            </div>
            {/* Slider controls */}
            <div className="flex items-center gap-2">
              <button onClick={prevSlide} disabled={testimonialIdx === 0}
                className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#7c4dff] hover:text-[#7c4dff] disabled:opacity-30 transition-all">
                <MdChevronLeft size={22} />
              </button>
              <span className="text-xs text-gray-400 font-medium">
                {testimonialIdx + 1} / {testimonials.length}
              </span>
              <button onClick={nextSlide} disabled={testimonialIdx >= testimonials.length - 1}
                className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#7c4dff] hover:text-[#7c4dff] disabled:opacity-30 transition-all">
                <MdChevronRight size={22} />
              </button>
            </div>
          </div>

          {/* Testimonial cards */}
          <div className="grid md:grid-cols-3 gap-5">
            {visibleTestimonials.map((t, i) => (
              <div key={`${t.name}-${i}`}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, j) => <MdStar key={j} className="text-yellow-400" size={15} />)}
                </div>
                <p className="text-sm text-gray-600 italic leading-relaxed flex-1 mb-5">"{t.text}"</p>
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

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setTestimonialIdx(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === testimonialIdx ? "w-6 bg-[#7c4dff]" : "w-2 bg-gray-300"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TAHAP 2 — FAQ (PRD V3)
      ══════════════════════════════════════════ */}
      <section id="faq" className="py-20 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#7c4dff]/10 text-[#7c4dff] text-xs font-bold px-3 py-1.5 rounded-full mb-3">FAQ</span>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-3">Pertanyaan yang Sering Ditanyakan</h2>
            <p className="text-sm text-gray-500">Temukan jawaban untuk pertanyaan umum seputar layanan LaundryPro</p>
          </div>
          <div className="space-y-3">
            {faqData.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
          </div>
          <div className="text-center mt-10">
            <p className="text-sm text-gray-500 mb-3">Masih ada pertanyaan lain?</p>
            <button
              onClick={() => window.open("https://wa.me/6281234567890", "_blank")}
              className="flex items-center gap-2 mx-auto bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md">
              <MdWhatsapp size={18} /> Hubungi via WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TAHAP 3 — CUSTOMER SUPPORT (PRD V3)
      ══════════════════════════════════════════ */}
      <section className="py-16 px-5 bg-[#f6f4fb]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-[#7c4dff]/10 text-[#7c4dff] text-xs font-bold px-3 py-1.5 rounded-full mb-3">Customer Support</span>
            <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Kami Siap Membantu Anda</h2>
            <p className="text-sm text-gray-500">Hubungi kami melalui berbagai saluran komunikasi yang tersedia</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {/* WhatsApp */}
            <button
              onClick={() => window.open("https://wa.me/6281234567890", "_blank")}
              className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/25">
                <MdWhatsapp size={28} />
              </div>
              <h3 className="font-extrabold text-gray-800 mb-1">WhatsApp</h3>
              <p className="text-xs text-gray-500 mb-3">Respons cepat, langsung ke tim CS kami</p>
              <p className="text-sm font-bold text-emerald-600">0812-3456-7890</p>
              <div className="flex items-center justify-center gap-1 mt-3 text-xs text-emerald-500 font-semibold">
                Chat Sekarang <MdKeyboardArrowRight size={16} />
              </div>
            </button>

            {/* Email */}
            <button
              onClick={() => window.open("mailto:halo@laundrypro.id", "_blank")}
              className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#7c4dff] flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#7c4dff]/25">
                <MdEmail size={28} />
              </div>
              <h3 className="font-extrabold text-gray-800 mb-1">Email</h3>
              <p className="text-xs text-gray-500 mb-3">Kirim pertanyaan atau keluhan via email</p>
              <p className="text-sm font-bold text-[#7c4dff]">halo@laundrypro.id</p>
              <div className="flex items-center justify-center gap-1 mt-3 text-xs text-[#7c4dff] font-semibold">
                Kirim Email <MdKeyboardArrowRight size={16} />
              </div>
            </button>

            {/* Lokasi */}
            <button
              onClick={() => window.open("https://maps.google.com", "_blank")}
              className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#ff6b81] flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#ff6b81]/25">
                <MdLocationOn size={28} />
              </div>
              <h3 className="font-extrabold text-gray-800 mb-1">Lokasi</h3>
              <p className="text-xs text-gray-500 mb-3">Kunjungi langsung outlet terdekat kami</p>
              <p className="text-sm font-bold text-[#ff6b81]">Jl. Sudirman No. 45</p>
              <div className="flex items-center justify-center gap-1 mt-3 text-xs text-[#ff6b81] font-semibold">
                Lihat Peta <MdKeyboardArrowRight size={16} />
              </div>
            </button>
          </div>

          {/* Jam operasional */}
          <div className="mt-8 bg-white rounded-2xl border border-[#efecf7] shadow-sm p-5 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#7c4dff]/10 flex items-center justify-center text-[#7c4dff]">
                <MdAccessTime size={20} />
              </div>
              <h3 className="font-bold text-gray-800">Jam Operasional</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ["Senin – Jumat", "08.00 – 21.00 WIB"],
                ["Sabtu – Minggu", "08.00 – 20.00 WIB"],
                ["Hari Libur Nasional", "09.00 – 18.00 WIB"],
                ["Layanan WhatsApp", "24 Jam"],
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-2.5">
                  <span className="text-gray-500 text-xs">{day}</span>
                  <span className="font-bold text-gray-800 text-xs">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER / PAYMENT (PRD V3) */}
      <section className="py-14 px-5 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Metode Pembayaran & Partner</p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {partners.map((p) => (
              <div key={p.name} className={`${p.bg} rounded-xl px-3 py-3 flex items-center justify-center border border-gray-100 hover:shadow-md transition-shadow cursor-default`}>
                <span className={`text-xs font-extrabold tracking-tight ${p.color}`}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — V3 updated */}
      <section className="py-20 px-5 bg-gradient-to-br from-[#1a103c] via-[#2d1b6b] to-[#4c2ca7] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7c4dff]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff6b81]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-[#ff6b81]/80 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-5">
            <MdLocalOffer size={13} /> Promo Pelanggan Baru
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
            Bergabung Sekarang dan Dapatkan{" "}
            <span className="text-[#c4b5fd]">Promo Pelanggan Baru</span>
          </h2>
          <p className="text-[#f0ebfa]/80 text-sm leading-relaxed mb-3 max-w-xl mx-auto">
            Daftar gratis dan nikmati <strong className="text-white">diskon 20%</strong> + <strong className="text-white">gratis antar jemput</strong> + <strong className="text-white">akses semua fitur CRM digital</strong> dari LaundryPro.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {["✅ Diskon 20%","🚚 Gratis Antar Jemput","📱 Tracking Real-time","⭐ Reward Point"].map((b) => (
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

      {/* ══════════════════════════════════════════
          FOOTER LENGKAP (PRD V3)
      ══════════════════════════════════════════ */}
      <footer id="kontak" className="bg-[#0f0a24] text-white">
        <div className="max-w-6xl mx-auto px-5 pt-16 pb-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#7c4dff] flex items-center justify-center shadow-md shadow-[#7c4dff]/30">
                  <MdLocalLaundryService size={20} />
                </div>
                <span className="font-extrabold text-lg tracking-tight">LaundryPro</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                Layanan laundry digital berbasis CRM. Bersih, cepat, dan terpercaya.
              </p>
              {/* Media Sosial */}
              <div>
                <p className="text-xs font-bold text-white/50 mb-3 tracking-wider uppercase">Media Sosial</p>
                <div className="flex gap-2">
                  {socialLinks.map((s) => (
                    <a key={s.name} href={s.href} target="_blank" rel="noreferrer"
                      className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center text-white transition-all`}
                      title={s.name}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Layanan */}
            <div>
              <h4 className="font-bold text-sm mb-4 text-white/90">Layanan</h4>
              <ul className="space-y-2.5 text-sm text-white/60">
                {["Laundry Reguler","Laundry Express","Cuci Sepatu","Bed Cover","Dry Cleaning"].map((l) => (
                  <li key={l}>
                    <button onClick={() => scrollTo("layanan")} className="hover:text-[#c4b5fd] transition-colors text-left">{l}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fitur Aplikasi */}
            <div>
              <h4 className="font-bold text-sm mb-4 text-white/90">Fitur CRM</h4>
              <ul className="space-y-2.5 text-sm text-white/60">
                {["Tracking Status","Reminder Otomatis","Riwayat Transaksi","Loyalty Member","Notifikasi Status"].map((f) => (
                  <li key={f}>
                    <button onClick={() => scrollTo("fitur")} className="hover:text-[#c4b5fd] transition-colors text-left">{f}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontak + Jam Operasional */}
            <div>
              <h4 className="font-bold text-sm mb-4 text-white/90">Kontak</h4>
              <ul className="space-y-3 text-sm text-white/60 mb-5">
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
              </ul>
              <h4 className="font-bold text-xs mb-3 text-white/70 uppercase tracking-wider">Jam Operasional</h4>
              <div className="space-y-1.5 text-xs text-white/50">
                <div className="flex justify-between"><span>Sen – Jum</span><span className="font-semibold text-white/70">08.00 – 21.00</span></div>
                <div className="flex justify-between"><span>Sab – Min</span><span className="font-semibold text-white/70">08.00 – 20.00</span></div>
                <div className="flex justify-between"><span>WhatsApp</span><span className="font-semibold text-emerald-400">24 Jam</span></div>
              </div>
            </div>
          </div>

          {/* Copyright bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/40">© {new Date().getFullYear()} LaundryPro. Hak Cipta Dilindungi.</p>
            <div className="flex gap-5 text-xs text-white/40">
              <button className="hover:text-white/70 transition-colors">Kebijakan Privasi</button>
              <button className="hover:text-white/70 transition-colors">Syarat & Ketentuan</button>
              <button onClick={() => scrollTo("faq")} className="hover:text-white/70 transition-colors">FAQ</button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
