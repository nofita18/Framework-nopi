// =====================================================
// DATA CRM TERPUSAT — LaundryPro CRM System
// Mencakup: Pelanggan, Transaksi, Komplain, Promo, Membership
// =====================================================

export const customers = [
  { id: "C001", name: "Andi Wijaya",      email: "andi@email.com",   phone: "081234567890", joined: "Jan 2026", status: "Aktif",       membership: "Gold",   source: "Instagram",  referral: "Dewi Lestari",   points: 1200 },
  { id: "C002", name: "Sari Dewi",        email: "sari@email.com",   phone: "082345678901", joined: "Feb 2026", status: "Aktif",       membership: "Silver", source: "WhatsApp",   referral: null,             points: 680  },
  { id: "C003", name: "Budi Santoso",     email: "budi@email.com",   phone: "083456789012", joined: "Mar 2026", status: "Aktif",       membership: "Bronze", source: "TikTok",     referral: null,             points: 420  },
  { id: "C004", name: "Rina Marlina",     email: "rina@email.com",   phone: "084567890123", joined: "Jan 2026", status: "Aktif",       membership: "Gold",   source: "Referral",   referral: "Andi Wijaya",    points: 1500 },
  { id: "C005", name: "Hendra Putra",     email: "hendra@email.com", phone: "085678901234", joined: "Apr 2026", status: "Tidak Aktif", membership: "Bronze", source: "Website",    referral: null,             points: 180  },
  { id: "C006", name: "Dewi Lestari",     email: "dewi@email.com",   phone: "086789012345", joined: "Des 2025", status: "Aktif",       membership: "Gold",   source: "Instagram",  referral: null,             points: 2100 },
  { id: "C007", name: "Fajar Nugroho",    email: "fajar@email.com",  phone: "087890123456", joined: "Feb 2026", status: "Aktif",       membership: "Silver", source: "TikTok",     referral: "Rina Marlina",   points: 750  },
  { id: "C008", name: "Gita Purnama",     email: "gita@email.com",   phone: "088901234567", joined: "Mar 2026", status: "Aktif",       membership: "Silver", source: "WhatsApp",   referral: null,             points: 860  },
  { id: "C009", name: "Irwan Setiawan",   email: "irwan@email.com",  phone: "089012345678", joined: "Mar 2026", status: "Aktif",       membership: "Bronze", source: "Instagram",  referral: "Sari Dewi",      points: 310  },
  { id: "C010", name: "Jeni Kusuma",      email: "jeni@email.com",   phone: "081123456789", joined: "Apr 2026", status: "Aktif",       membership: "Bronze", source: "TikTok",     referral: null,             points: 240  },
  { id: "C011", name: "Kevin Hartono",    email: "kevin@email.com",  phone: "082234567890", joined: "Apr 2026", status: "Aktif",       membership: "Silver", source: "Referral",   referral: "Dewi Lestari",   points: 590  },
  { id: "C012", name: "Lina Anggraini",   email: "lina@email.com",   phone: "083345678901", joined: "Mei 2026", status: "Aktif",       membership: "Bronze", source: "Website",    referral: null,             points: 120  },
  { id: "C013", name: "Muhamad Rizal",    email: "rizal@email.com",  phone: "084456789012", joined: "Mei 2026", status: "Aktif",       membership: "Bronze", source: "Instagram",  referral: null,             points: 150  },
  { id: "C014", name: "Nadia Safitri",    email: "nadia@email.com",  phone: "085567890123", joined: "Mei 2026", status: "Aktif",       membership: "Silver", source: "WhatsApp",   referral: "Gita Purnama",   points: 480  },
  { id: "C015", name: "Oka Permana",      email: "oka@email.com",    phone: "086678901234", joined: "Jun 2026", status: "Aktif",       membership: "Bronze", source: "TikTok",     referral: null,             points: 90   },
  { id: "C016", name: "Putri Rahayu",     email: "putri@email.com",  phone: "087789012345", joined: "Jun 2026", status: "Aktif",       membership: "Bronze", source: "Instagram",  referral: "Andi Wijaya",    points: 60   },
  { id: "C017", name: "Qori Amalia",      email: "qori@email.com",   phone: "088890123456", joined: "Jun 2026", status: "Aktif",       membership: "Bronze", source: "Referral",   referral: "Budi Santoso",   points: 40   },
  { id: "C018", name: "Rudi Hermawan",    email: "rudi@email.com",   phone: "089901234567", joined: "Jan 2026", status: "Aktif",       membership: "Gold",   source: "Website",    referral: null,             points: 1800 },
  { id: "C019", name: "Siska Wulandari",  email: "siska@email.com",  phone: "081012345678", joined: "Feb 2026", status: "Tidak Aktif", membership: "Bronze", source: "WhatsApp",   referral: null,             points: 90   },
  { id: "C020", name: "Tono Prasetyo",    email: "tono@email.com",   phone: "082123456789", joined: "Mar 2026", status: "Aktif",       membership: "Silver", source: "Instagram",  referral: "Fajar Nugroho",  points: 620  },
];

export const orders = [
  { id: "ORD-001", customerId: "C003", customer: "Budi Santoso",    phone: "083456789012", service: "Cuci Kiloan",     weight: "3 kg",   total: 21000,  status: "Selesai",         date: "10 Jun 2026" },
  { id: "ORD-002", customerId: "C002", customer: "Sari Dewi",       phone: "082345678901", service: "Cuci Express",    weight: "2 kg",   total: 24000,  status: "Selesai",         date: "11 Jun 2026" },
  { id: "ORD-003", customerId: "C001", customer: "Andi Wijaya",     phone: "081234567890", service: "Cuci Sepatu",     weight: "1 psg",  total: 25000,  status: "Selesai",         date: "12 Jun 2026" },
  { id: "ORD-004", customerId: "C006", customer: "Dewi Lestari",    phone: "086789012345", service: "Dry Cleaning",    weight: "2 item", total: 70000,  status: "Selesai",         date: "12 Jun 2026" },
  { id: "ORD-005", customerId: "C020", customer: "Tono Prasetyo",   phone: "082123456789", service: "Cuci + Setrika",  weight: "4 kg",   total: 40000,  status: "Selesai",         date: "13 Jun 2026" },
  { id: "ORD-006", customerId: "C004", customer: "Rina Marlina",    phone: "084567890123", service: "Cuci Bed Cover",  weight: "1 item", total: 30000,  status: "Selesai",         date: "13 Jun 2026" },
  { id: "ORD-007", customerId: "C007", customer: "Fajar Nugroho",   phone: "087890123456", service: "Setrika Saja",    weight: "3 kg",   total: 15000,  status: "Selesai",         date: "14 Jun 2026" },
  { id: "ORD-008", customerId: "C018", customer: "Rudi Hermawan",   phone: "089901234567", service: "Cuci Kiloan",     weight: "5 kg",   total: 35000,  status: "Selesai",         date: "15 Jun 2026" },
  { id: "ORD-009", customerId: "C008", customer: "Gita Purnama",    phone: "088901234567", service: "Cuci Express",    weight: "2 kg",   total: 24000,  status: "Selesai",         date: "20 Jun 2026" },
  { id: "ORD-010", customerId: "C011", customer: "Kevin Hartono",   phone: "082234567890", service: "Cuci Karpet",     weight: "1 item", total: 50000,  status: "Selesai",         date: "22 Jun 2026" },
  { id: "ORD-011", customerId: "C001", customer: "Andi Wijaya",     phone: "081234567890", service: "Cuci Kiloan",     weight: "4 kg",   total: 28000,  status: "Selesai",         date: "25 Jun 2026" },
  { id: "ORD-012", customerId: "C006", customer: "Dewi Lestari",    phone: "086789012345", service: "Cuci + Setrika",  weight: "3 kg",   total: 30000,  status: "Selesai",         date: "28 Jun 2026" },
  { id: "ORD-013", customerId: "C014", customer: "Nadia Safitri",   phone: "085567890123", service: "Cuci Selimut",    weight: "1 item", total: 25000,  status: "Selesai",         date: "01 Jul 2026" },
  { id: "ORD-014", customerId: "C004", customer: "Rina Marlina",    phone: "084567890123", service: "Dry Cleaning",    weight: "3 item", total: 105000, status: "Selesai",         date: "03 Jul 2026" },
  { id: "ORD-015", customerId: "C018", customer: "Rudi Hermawan",   phone: "089901234567", service: "Cuci Express",    weight: "2 kg",   total: 24000,  status: "Selesai",         date: "05 Jul 2026" },
  { id: "ORD-016", customerId: "C002", customer: "Sari Dewi",       phone: "082345678901", service: "Setrika Saja",    weight: "2 kg",   total: 10000,  status: "Siap Diambil",    date: "12 Jul 2026" },
  { id: "ORD-017", customerId: "C009", customer: "Irwan Setiawan",  phone: "089012345678", service: "Cuci Kiloan",     weight: "3 kg",   total: 21000,  status: "Disetrika",       date: "13 Jul 2026" },
  { id: "ORD-018", customerId: "C003", customer: "Budi Santoso",    phone: "083456789012", service: "Cuci Sepatu",     weight: "2 psg",  total: 50000,  status: "Dicuci",          date: "13 Jul 2026" },
  { id: "ORD-019", customerId: "C013", customer: "Muhamad Rizal",   phone: "084456789012", service: "Cuci Kiloan",     weight: "4 kg",   total: 28000,  status: "Diterima",        date: "14 Jul 2026" },
  { id: "ORD-020", customerId: "C015", customer: "Oka Permana",     phone: "086678901234", service: "Cuci + Setrika",  weight: "3 kg",   total: 30000,  status: "Diterima",        date: "14 Jul 2026" },
  { id: "ORD-021", customerId: "C016", customer: "Putri Rahayu",    phone: "087789012345", service: "Cuci Express",    weight: "2 kg",   total: 24000,  status: "Diterima",        date: "14 Jul 2026" },
  { id: "ORD-022", customerId: "C006", customer: "Dewi Lestari",    phone: "086789012345", service: "Cuci Kiloan",     weight: "5 kg",   total: 35000,  status: "Dicuci",          date: "14 Jul 2026" },
];

export const complaints = [
  { id: "TKT-001", customerId: "C003", customer: "Budi Santoso",    phone: "083456789012", orderId: "ORD-001", category: "Kualitas Cucian",   issue: "Pakaian masih berbau setelah dicuci",                    status: "Selesai",   priority: "Tinggi",  createdAt: "11 Jun 2026", resolvedAt: "12 Jun 2026", rating: 4, review: "Sudah diperbaiki, terima kasih",           adminNote: "Dilakukan pencucian ulang gratis" },
  { id: "TKT-002", customerId: "C002", customer: "Sari Dewi",       phone: "082345678901", orderId: "ORD-002", category: "Keterlambatan",      issue: "Pakaian tidak selesai sesuai waktu yang dijanjikan",     status: "Selesai",   priority: "Sedang",  createdAt: "13 Jun 2026", resolvedAt: "14 Jun 2026", rating: 3, review: "Oke, tapi harap lebih tepat waktu",        adminNote: "Diberikan diskon 20% pesanan berikutnya" },
  { id: "TKT-003", customerId: "C001", customer: "Andi Wijaya",     phone: "081234567890", orderId: "ORD-003", category: "Barang Rusak",       issue: "Sol sepatu terlepas setelah dicuci",                     status: "Proses",    priority: "Tinggi",  createdAt: "14 Jun 2026", resolvedAt: null,           rating: null, review: null,                                   adminNote: "Sedang pengecekan oleh tim teknis" },
  { id: "TKT-004", customerId: "C004", customer: "Rina Marlina",    phone: "084567890123", orderId: "ORD-006", category: "Kehilangan Item",    issue: "1 buah sarung bantal hilang dari paket bed cover",       status: "Proses",    priority: "Tinggi",  createdAt: "15 Jun 2026", resolvedAt: null,           rating: null, review: null,                                   adminNote: "Investigasi gudang sedang berjalan" },
  { id: "TKT-005", customerId: "C006", customer: "Dewi Lestari",    phone: "086789012345", orderId: "ORD-004", category: "Kualitas Cucian",   issue: "Noda belum hilang setelah dry cleaning",                 status: "Selesai",   priority: "Sedang",  createdAt: "14 Jun 2026", resolvedAt: "15 Jun 2026", rating: 5, review: "Sangat puas dengan penanganannya",          adminNote: "Proses ulang dry cleaning gratis" },
  { id: "TKT-006", customerId: "C018", customer: "Rudi Hermawan",   phone: "089901234567", orderId: "ORD-008", category: "Harga",              issue: "Tagihan tidak sesuai dengan estimasi yang diberikan",    status: "Selesai",   priority: "Rendah",  createdAt: "17 Jun 2026", resolvedAt: "17 Jun 2026", rating: 4, review: "Masalah terselesaikan dengan baik",         adminNote: "Koreksi tagihan sudah dilakukan" },
  { id: "TKT-007", customerId: "C008", customer: "Gita Purnama",    phone: "088901234567", orderId: "ORD-009", category: "Keterlambatan",      issue: "Pengiriman telat 2 jam dari jadwal",                     status: "Selesai",   priority: "Sedang",  createdAt: "22 Jun 2026", resolvedAt: "22 Jun 2026", rating: 3, review: "Harap perbaiki sistem pengiriman",           adminNote: "Tim kurir sudah dievaluasi" },
  { id: "TKT-008", customerId: "C007", customer: "Fajar Nugroho",   phone: "087890123456", orderId: "ORD-007", category: "Lainnya",            issue: "Aplikasi tidak bisa tracking status pesanan",            status: "Selesai",   priority: "Rendah",  createdAt: "15 Jun 2026", resolvedAt: "16 Jun 2026", rating: 5, review: "Cepat ditangani, mantap",                   adminNote: "Bug aplikasi sudah diperbaiki" },
  { id: "TKT-009", customerId: "C014", customer: "Nadia Safitri",   phone: "085567890123", orderId: "ORD-013", category: "Kualitas Cucian",   issue: "Selimut menyusut setelah proses pencucian",              status: "Aktif",     priority: "Tinggi",  createdAt: "02 Jul 2026", resolvedAt: null,           rating: null, review: null,                                   adminNote: "Menunggu respon pelanggan untuk ganti rugi" },
  { id: "TKT-010", customerId: "C011", customer: "Kevin Hartono",   phone: "082234567890", orderId: "ORD-010", category: "Barang Rusak",       issue: "Ada sobekan kecil di karpet setelah dicuci",             status: "Aktif",     priority: "Tinggi",  createdAt: "24 Jun 2026", resolvedAt: null,           rating: null, review: null,                                   adminNote: "Menunggu penilaian kerusakan dari supervisor" },
  { id: "TKT-011", customerId: "C020", customer: "Tono Prasetyo",   phone: "082123456789", orderId: "ORD-005", category: "Keterlambatan",      issue: "Pesanan tidak selesai tepat waktu padahal sudah express", status: "Selesai",  priority: "Sedang",  createdAt: "14 Jun 2026", resolvedAt: "14 Jun 2026", rating: 4, review: "Akhirnya selesai juga, oke lah",            adminNote: "Diskon voucher 15% diberikan" },
  { id: "TKT-012", customerId: "C009", customer: "Irwan Setiawan",  phone: "089012345678", orderId: "ORD-017", category: "Lainnya",            issue: "Notifikasi status pesanan tidak masuk ke WhatsApp",      status: "Aktif",     priority: "Rendah",  createdAt: "14 Jul 2026", resolvedAt: null,           rating: null, review: null,                                   adminNote: "Sedang dicek oleh tim IT" },
];

export const promos = [
  { id: "PRO-001", name: "Member Baru Hemat",       type: "Diskon",    discount: "20%", minOrder: 0,      target: "Semua Member Baru",       channel: ["WhatsApp", "Instagram"],        startDate: "01 Jan 2026", endDate: "31 Mar 2026", status: "Berakhir",  usageCount: 45, description: "Diskon 20% untuk member baru pada 3 transaksi pertama" },
  { id: "PRO-002", name: "Promo Ramadan 2026",      type: "Diskon",    discount: "15%", minOrder: 30000,  target: "Semua Pelanggan",           channel: ["Instagram", "TikTok"],          startDate: "01 Mar 2026", endDate: "31 Mar 2026", status: "Berakhir",  usageCount: 88, description: "Diskon 15% selama bulan Ramadan untuk semua layanan" },
  { id: "PRO-003", name: "Cashback Gold Member",    type: "Cashback",  discount: "10%", minOrder: 50000,  target: "Member Gold",               channel: ["WhatsApp"],                     startDate: "01 Apr 2026", endDate: "30 Jun 2026", status: "Berakhir",  usageCount: 23, description: "Cashback 10% khusus member Gold minimum transaksi Rp 50.000" },
  { id: "PRO-004", name: "Referral Bonus Ganda",    type: "Poin",      discount: "2x",  minOrder: 0,      target: "Semua Pelanggan",           channel: ["WhatsApp", "Instagram"],        startDate: "01 Mei 2026", endDate: "31 Mei 2026", status: "Berakhir",  usageCount: 17, description: "Poin referral dobel untuk setiap mengajak teman baru" },
  { id: "PRO-005", name: "Flash Sale Hari Senin",   type: "Diskon",    discount: "25%", minOrder: 20000,  target: "Semua Pelanggan",           channel: ["TikTok", "Instagram"],          startDate: "01 Jun 2026", endDate: "30 Jun 2026", status: "Berakhir",  usageCount: 62, description: "Diskon 25% setiap hari Senin untuk layanan cuci kiloan" },
  { id: "PRO-006", name: "Anniversary LaundryPro",  type: "Diskon",    discount: "30%", minOrder: 50000,  target: "Semua Pelanggan",           channel: ["Instagram", "TikTok", "Website"], startDate: "14 Jul 2026", endDate: "17 Jul 2026", status: "Aktif",     usageCount: 31, description: "Diskon 30% merayakan ulang tahun LaundryPro ke-3" },
  { id: "PRO-007", name: "Upgrade Silver to Gold",  type: "Upgrade",   discount: "-",   minOrder: 200000, target: "Member Silver",             channel: ["WhatsApp"],                     startDate: "01 Jul 2026", endDate: "31 Jul 2026", status: "Aktif",     usageCount: 8,  description: "Upgrade otomatis ke Gold jika total belanja mencapai Rp 200.000 bulan ini" },
  { id: "PRO-008", name: "Promo Cuci Gratis 1x",    type: "Gratis",    discount: "1x",  minOrder: 0,      target: "Pelanggan Tidak Aktif",     channel: ["WhatsApp"],                     startDate: "01 Jul 2026", endDate: "31 Jul 2026", status: "Aktif",     usageCount: 4,  description: "Win-back campaign: cuci gratis 1x untuk pelanggan yang >30 hari tidak transaksi" },
  { id: "PRO-009", name: "Diskon Kiloan Agustus",   type: "Diskon",    discount: "10%", minOrder: 15000,  target: "Semua Pelanggan",           channel: ["Instagram", "TikTok"],          startDate: "01 Agu 2026", endDate: "31 Agu 2026", status: "Mendatang", usageCount: 0,  description: "Diskon 10% untuk cuci kiloan sepanjang Agustus" },
  { id: "PRO-010", name: "Poin Double Weekend",     type: "Poin",      discount: "2x",  minOrder: 0,      target: "Semua Member",              channel: ["Instagram", "WhatsApp"],        startDate: "01 Agu 2026", endDate: "31 Agu 2026", status: "Mendatang", usageCount: 0,  description: "Poin dobel setiap transaksi di Sabtu dan Minggu" },
];

// Riwayat campaign pelanggan
export const customerCampaigns = [
  { customerId: "C001", promoId: "PRO-001", usedAt: "15 Jan 2026", saving: 5000  },
  { customerId: "C001", promoId: "PRO-003", usedAt: "10 Apr 2026", saving: 7000  },
  { customerId: "C001", promoId: "PRO-006", usedAt: "14 Jul 2026", saving: 21000 },
  { customerId: "C002", promoId: "PRO-001", usedAt: "20 Feb 2026", saving: 4800  },
  { customerId: "C002", promoId: "PRO-002", usedAt: "15 Mar 2026", saving: 3600  },
  { customerId: "C003", promoId: "PRO-002", usedAt: "20 Mar 2026", saving: 3150  },
  { customerId: "C004", promoId: "PRO-003", usedAt: "05 Apr 2026", saving: 10500 },
  { customerId: "C004", promoId: "PRO-005", usedAt: "02 Jun 2026", saving: 7500  },
  { customerId: "C006", promoId: "PRO-003", usedAt: "12 Apr 2026", saving: 7000  },
  { customerId: "C006", promoId: "PRO-005", usedAt: "09 Jun 2026", saving: 8750  },
  { customerId: "C006", promoId: "PRO-006", usedAt: "14 Jul 2026", saving: 10500 },
  { customerId: "C007", promoId: "PRO-004", usedAt: "10 Mei 2026", saving: 0     },
  { customerId: "C008", promoId: "PRO-004", usedAt: "15 Mei 2026", saving: 0     },
  { customerId: "C011", promoId: "PRO-005", usedAt: "06 Jun 2026", saving: 12500 },
  { customerId: "C018", promoId: "PRO-003", usedAt: "20 Apr 2026", saving: 3500  },
  { customerId: "C018", promoId: "PRO-006", usedAt: "14 Jul 2026", saving: 7200  },
  { customerId: "C020", promoId: "PRO-005", usedAt: "16 Jun 2026", saving: 10000 },
];

// Membership tiers
export const membershipTiers = {
  Bronze: { minPoints: 0,    maxPoints: 499,  color: "text-amber-700",  bg: "bg-amber-50",  badge: "warning",  benefits: ["Poin reward setiap transaksi", "Notifikasi promo via WhatsApp"] },
  Silver: { minPoints: 500,  maxPoints: 999,  color: "text-gray-500",   bg: "bg-gray-50",   badge: "secondary",benefits: ["Semua benefit Bronze", "Diskon 5% setiap transaksi", "Prioritas antrian"] },
  Gold:   { minPoints: 1000, maxPoints: 9999, color: "text-yellow-600", bg: "bg-yellow-50", badge: "primary",  benefits: ["Semua benefit Silver", "Cashback 10% min Rp 50.000", "Free delivery", "Bonus poin 2x"] },
};

// Statistik sumber pelanggan untuk marketing chart
export const customerSources = [
  { source: "Instagram", count: 7,  color: "#e1306c" },
  { source: "TikTok",    count: 4,  color: "#000000" },
  { source: "WhatsApp",  count: 4,  color: "#25d366" },
  { source: "Referral",  count: 3,  color: "#6344f2" },
  { source: "Website",   count: 2,  color: "#3b82f6" },
];

// Helper: total transaksi per pelanggan
export function getCustomerStats() {
  return customers.map((c) => {
    const custOrders = orders.filter((o) => o.customerId === c.id && o.status === "Selesai");
    const totalSpent = custOrders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = custOrders.length;
    const custComplaints = complaints.filter((cp) => cp.customerId === c.id);
    const campaigns = customerCampaigns.filter((cc) => cc.customerId === c.id).map((cc) => promos.find((p) => p.id === cc.promoId)?.name ?? cc.promoId);
    return { ...c, totalSpent, totalOrders, totalComplaints: custComplaints.length, campaigns };
  });
}

// Helper: dashboard summary
export const dashboardSummary = {
  totalCustomers: customers.length,
  newCustomers: customers.filter((c) => c.joined.includes("2026") && (c.joined.includes("Jun") || c.joined.includes("Jul"))).length,
  totalTransactions: orders.length,
  totalRevenue: orders.filter((o) => o.status === "Selesai").reduce((s, o) => s + o.total, 0),
  activeComplaints: complaints.filter((c) => c.status === "Aktif" || c.status === "Proses").length,
  goldMembers: customers.filter((c) => c.membership === "Gold").length,
  activePromos: promos.filter((p) => p.status === "Aktif").length,
};
