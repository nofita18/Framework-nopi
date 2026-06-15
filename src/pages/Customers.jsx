import { useState } from "react";
import {
  MdSearch, MdAdd, MdPeople, MdStar, MdLocalOffer,
  MdTrendingUp, MdClose, MdHistory, MdPhone, MdEmail,
} from "react-icons/md";

import PageHeader  from "../components/PageHeader";
import Table       from "../components/Table";
import Avatar      from "../components/Avatar";
import Badge       from "../components/Badge";
import InputField  from "../components/InputField";
import Button      from "../components/Button";
import Card        from "../components/Card";
import Modal       from "../components/Modal";
import SelectField from "../components/SelectField";
import { getCustomerStats, membershipTiers, orders, complaints, customerCampaigns, promos } from "../data/crmData";

const tableHeaders = ["Pelanggan", "No. HP", "Membership", "Total Pesanan", "Total Belanja", "Poin", "Sumber", "Status", "Aksi"];

const membershipBadge = { Gold: "primary", Silver: "secondary", Bronze: "warning" };
const sourceColor = {
  Instagram: "bg-pink-100 text-pink-700",
  TikTok:    "bg-gray-100 text-gray-700",
  WhatsApp:  "bg-emerald-100 text-emerald-700",
  Referral:  "bg-purple-100 text-purple-700",
  Website:   "bg-blue-100 text-blue-700",
};

export default function Customers() {
  const [search, setSearch]           = useState("");
  const [filterMembership, setFilterM]= useState("");
  const [filterSource, setFilterS]    = useState("");
  const [selectedCustomer, setSelected] = useState(null);

  const customersData = getCustomerStats();

  const filtered = customersData.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchM = filterMembership ? c.membership === filterMembership : true;
    const matchS = filterSource     ? c.source === filterSource         : true;
    return matchSearch && matchM && matchS;
  });

  // Stats summary
  const gold   = customersData.filter((c) => c.membership === "Gold").length;
  const silver = customersData.filter((c) => c.membership === "Silver").length;
  const bronze = customersData.filter((c) => c.membership === "Bronze").length;

  // Detail modal data
  function getCustomerDetail(c) {
    const custOrders     = orders.filter((o) => o.customerId === c.id);
    const custComplaints = complaints.filter((cp) => cp.customerId === c.id);
    const custCampaigns  = customerCampaigns
      .filter((cc) => cc.customerId === c.id)
      .map((cc) => ({ ...cc, promo: promos.find((p) => p.id === cc.promoId) }));
    return { custOrders, custComplaints, custCampaigns };
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <PageHeader
          title="Pelanggan — Sales Automation"
          subtitle="Manajemen data pelanggan, membership, dan riwayat transaksi CRM"
          breadcrumb={["Dashboard", "Pelanggan"]}
        />
        <Button type="primary">
          <span className="flex items-center gap-1.5"><MdAdd size={18} /> Tambah Pelanggan</span>
        </Button>
      </div>

      {/* Membership Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { tier: "Gold",   count: gold,   icon: "🥇", bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700" },
          { tier: "Silver", count: silver, icon: "🥈", bg: "bg-gray-50",   border: "border-gray-200",   text: "text-gray-600"   },
          { tier: "Bronze", count: bronze, icon: "🥉", bg: "bg-amber-50",  border: "border-amber-200",  text: "text-amber-700"  },
        ].map((m) => (
          <div key={m.tier} className={`${m.bg} rounded-2xl border ${m.border} p-5 flex items-center gap-4`}>
            <span className="text-3xl">{m.icon}</span>
            <div>
              <p className={`text-2xl font-bold ${m.text}`}>{m.count}</p>
              <p className="text-xs text-gray-500">Member {m.tier}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{membershipTiers[m.tier].benefits[0]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-3 items-center">
        <div className="flex-1">
          <InputField
            placeholder="Cari nama, email, atau no. HP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<MdSearch size={16} />}
          />
        </div>
        <div className="w-full sm:w-44">
          <SelectField
            value={filterMembership}
            onChange={(e) => setFilterM(e.target.value)}
            options={["Gold", "Silver", "Bronze"]}
            placeholder="Semua Membership"
          />
        </div>
        <div className="w-full sm:w-44">
          <SelectField
            value={filterSource}
            onChange={(e) => setFilterS(e.target.value)}
            options={["Instagram", "TikTok", "WhatsApp", "Referral", "Website"]}
            placeholder="Semua Sumber"
          />
        </div>
        <span className="text-sm text-gray-400 shrink-0">{filtered.length} pelanggan</span>
      </div>

      {/* Table */}
      {filtered.length > 0 ? (
        <Table headers={tableHeaders}>
          {filtered.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50/60 transition-colors">
              {/* Pelanggan */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <Avatar name={c.name} size="md" />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.email}</p>
                    <p className="text-[10px] text-gray-300">Bergabung: {c.joined}</p>
                  </div>
                </div>
              </td>
              {/* No HP */}
              <td className="px-5 py-4 text-sm text-gray-500">{c.phone}</td>
              {/* Membership */}
              <td className="px-5 py-4">
                <Badge type={membershipBadge[c.membership] ?? "secondary"}>
                  {c.membership === "Gold" ? "🥇" : c.membership === "Silver" ? "🥈" : "🥉"} {c.membership}
                </Badge>
              </td>
              {/* Total Pesanan */}
              <td className="px-5 py-4 text-sm font-medium text-gray-700">{c.totalOrders}x</td>
              {/* Total Belanja */}
              <td className="px-5 py-4 text-sm font-bold text-[#6344f2]">
                Rp {c.totalSpent.toLocaleString("id-ID")}
              </td>
              {/* Poin */}
              <td className="px-5 py-4">
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                  ⭐ {c.points}
                </span>
              </td>
              {/* Sumber */}
              <td className="px-5 py-4">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${sourceColor[c.source] ?? "bg-gray-100 text-gray-600"}`}>
                  {c.source}
                </span>
              </td>
              {/* Status */}
              <td className="px-5 py-4">
                <Badge type={c.status === "Aktif" ? "success" : "secondary"}>{c.status}</Badge>
              </td>
              {/* Aksi */}
              <td className="px-5 py-4">
                <div className="flex gap-2">
                  <Button type="outline" className="px-3 py-1 text-xs" onClick={() => setSelected(c)}>Detail</Button>
                  <Button type="danger"  className="px-3 py-1 text-xs">Hapus</Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 text-gray-400">
          <MdPeople size={40} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">Pelanggan tidak ditemukan</p>
        </div>
      )}

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedCustomer}
        onClose={() => setSelected(null)}
        title={`Detail Pelanggan — ${selectedCustomer?.id}`}
      >
        {selectedCustomer && (() => {
          const { custOrders, custComplaints, custCampaigns } = getCustomerDetail(selectedCustomer);
          const tier = membershipTiers[selectedCustomer.membership];
          return (
            <div className="space-y-4 text-sm max-h-[70vh] overflow-y-auto pr-1">
              {/* Header */}
              <div className="flex items-center gap-3">
                <Avatar name={selectedCustomer.name} size="lg" />
                <div>
                  <p className="font-bold text-gray-800 text-base">{selectedCustomer.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <MdEmail size={12} className="text-gray-400" /><span className="text-xs text-gray-400">{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdPhone size={12} className="text-gray-400" /><span className="text-xs text-gray-400">{selectedCustomer.phone}</span>
                  </div>
                </div>
              </div>

              {/* Membership Info */}
              <div className={`${tier.bg} rounded-xl p-4 border border-gray-100`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-700">Membership</span>
                  <Badge type={membershipBadge[selectedCustomer.membership]}>
                    {selectedCustomer.membership === "Gold" ? "🥇" : selectedCustomer.membership === "Silver" ? "🥈" : "🥉"} {selectedCustomer.membership}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mb-1">Poin: <strong className="text-amber-600">⭐ {selectedCustomer.points}</strong></p>
                <ul className="space-y-0.5">
                  {tier.benefits.map((b, i) => (
                    <li key={i} className="text-xs text-gray-500 flex items-center gap-1">
                      <span className="text-emerald-500">✓</span>{b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  ["Total Pesanan", `${custOrders.length}x`, "text-indigo-600"],
                  ["Total Belanja", `Rp ${selectedCustomer.totalSpent.toLocaleString("id-ID")}`, "text-[#6344f2]"],
                  ["Komplain", `${custComplaints.length}x`, "text-red-500"],
                ].map(([l, v, t]) => (
                  <div key={l} className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className={`font-bold ${t} text-sm`}>{v}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{l}</p>
                  </div>
                ))}
              </div>

              {/* Riwayat Pesanan */}
              <div>
                <p className="font-bold text-gray-700 mb-2 flex items-center gap-1"><MdHistory size={14}/> Riwayat Pesanan</p>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {custOrders.length > 0 ? custOrders.map((o) => (
                    <div key={o.id} className="flex items-center justify-between text-xs bg-gray-50 rounded-lg px-3 py-2">
                      <span className="font-mono text-gray-400">{o.id}</span>
                      <span className="text-gray-600">{o.service}</span>
                      <span className="font-bold text-[#6344f2]">Rp {o.total.toLocaleString("id-ID")}</span>
                      <Badge type={o.status === "Selesai" ? "success" : "warning"}>{o.status}</Badge>
                    </div>
                  )) : <p className="text-xs text-gray-400 text-center py-2">Belum ada pesanan</p>}
                </div>
              </div>

              {/* Campaign History */}
              <div>
                <p className="font-bold text-gray-700 mb-2 flex items-center gap-1"><MdLocalOffer size={14}/> Promo Digunakan</p>
                <div className="space-y-1">
                  {custCampaigns.length > 0 ? custCampaigns.map((cc, i) => (
                    <div key={i} className="flex items-center justify-between text-xs bg-pink-50 rounded-lg px-3 py-2">
                      <span className="text-gray-700">{cc.promo?.name ?? cc.promoId}</span>
                      <span className="text-gray-400">{cc.usedAt}</span>
                      {cc.saving > 0 && <span className="text-emerald-600 font-bold">-Rp {cc.saving.toLocaleString("id-ID")}</span>}
                    </div>
                  )) : <p className="text-xs text-gray-400 text-center py-2">Belum menggunakan promo</p>}
                </div>
              </div>

              {/* Referral */}
              {selectedCustomer.referral && (
                <div className="bg-purple-50 rounded-xl p-3 border border-purple-100">
                  <p className="text-xs font-bold text-purple-700">Dirujuk oleh: {selectedCustomer.referral}</p>
                  <p className="text-[10px] text-purple-400 mt-0.5">Program referral aktif</p>
                </div>
              )}

              <Button type="secondary" className="w-full mt-2" onClick={() => setSelected(null)}>Tutup</Button>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
