import { useState } from "react";
import {
  MdCampaign, MdLocalOffer, MdPeople, MdShare,
  MdSearch, MdAdd, MdTrendingUp, MdCheckCircle, MdAccessTime,
} from "react-icons/md";

import PageHeader  from "../components/PageHeader";
import Table       from "../components/Table";
import Badge       from "../components/Badge";
import Card        from "../components/Card";
import Button      from "../components/Button";
import InputField  from "../components/InputField";
import SelectField from "../components/SelectField";
import Avatar      from "../components/Avatar";
import Modal       from "../components/Modal";
import {
  promos, customerCampaigns, customers, customerSources, membershipTiers,
} from "../data/crmData";

const promoStatusType = { Aktif: "success", Berakhir: "secondary", Mendatang: "info" };
const promoTypeColor  = {
  Diskon:   "bg-pink-100 text-pink-700",
  Cashback: "bg-emerald-100 text-emerald-700",
  Poin:     "bg-purple-100 text-purple-700",
  Upgrade:  "bg-yellow-100 text-yellow-700",
  Gratis:   "bg-blue-100 text-blue-700",
};
const channelColor = {
  Instagram: "bg-pink-50 text-pink-600",
  TikTok:    "bg-gray-100 text-gray-600",
  WhatsApp:  "bg-emerald-50 text-emerald-700",
  Website:   "bg-blue-50 text-blue-600",
};
const promoTableHeaders = ["Nama Promo", "Tipe", "Diskon", "Target", "Channel", "Periode", "Penggunaan", "Status", "Aksi"];

export default function Marketing() {
  const [search, setSearch]       = useState("");
  const [filterStatus, setFilter] = useState("");
  const [selectedPromo, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("promo"); // "promo" | "referral" | "campaign"

  const totalSourceCount = customerSources.reduce((s, x) => s + x.count, 0);

  const filteredPromos = promos.filter((p) => {
    const matchS = p.name.toLowerCase().includes(search.toLowerCase()) ||
                   p.type.toLowerCase().includes(search.toLowerCase());
    const matchF = filterStatus ? p.status === filterStatus : true;
    return matchS && matchF;
  });

  // Referral data
  const referralCustomers = customers.filter((c) => c.referral !== null);
  const referralBy = customers.map((c) => ({
    name: c.name,
    referred: customers.filter((x) => x.referral === c.name).length,
  })).filter((r) => r.referred > 0).sort((a, b) => b.referred - a.referred);

  // Campaign history (all)
  const campaignHistory = customerCampaigns.map((cc) => {
    const customer = customers.find((c) => c.id === cc.customerId);
    const promo    = promos.find((p) => p.id === cc.promoId);
    return { ...cc, customerName: customer?.name ?? "-", promoName: promo?.name ?? cc.promoId, promoType: promo?.type ?? "-" };
  });

  // Stats
  const activePromos   = promos.filter((p) => p.status === "Aktif").length;
  const totalUsage     = promos.reduce((s, p) => s + p.usageCount, 0);
  const totalReferrals = referralCustomers.length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Marketing"
        subtitle="Kelola promo, referral, campaign, dan analitik sumber pelanggan CRM"
        breadcrumb={["Dashboard", "Marketing"]}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Promo Aktif",       value: activePromos,   icon: <MdLocalOffer className="text-pink-500" size={18}/>,    bg: "bg-pink-50"   },
          { label: "Total Penggunaan",  value: totalUsage,     icon: <MdTrendingUp className="text-emerald-500" size={18}/>, bg: "bg-emerald-50"},
          { label: "Program Referral",  value: totalReferrals, icon: <MdPeople className="text-purple-500" size={18}/>,      bg: "bg-purple-50" },
          { label: "Total Campaign",    value: campaignHistory.length, icon: <MdCampaign className="text-indigo-500" size={18}/>,   bg: "bg-indigo-50" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>{s.icon}</div>
            <p className="text-2xl font-bold text-gray-800">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Sumber Pelanggan + Membership Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sumber Pelanggan */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <MdShare className="text-[#6344f2]" size={18} />
            <h3 className="font-bold text-gray-800">Statistik Sumber Pelanggan</h3>
          </div>
          <div className="space-y-4">
            {customerSources.map((s) => (
              <div key={s.source} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-24 shrink-0 font-medium">{s.source}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all"
                    style={{ width: `${(s.count / totalSourceCount) * 100}%`, backgroundColor: s.color }}
                  />
                </div>
                <span className="text-sm font-bold text-gray-700 w-6 text-right">{s.count}</span>
                <span className="text-xs text-gray-400 w-10 text-right">
                  {Math.round((s.count / totalSourceCount) * 100)}%
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-50">
            <p className="text-xs text-gray-400">Total {totalSourceCount} pelanggan terdata dari semua channel</p>
          </div>
        </Card>

        {/* Top Referral */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <MdPeople className="text-purple-500" size={18} />
            <h3 className="font-bold text-gray-800">Program Referral</h3>
          </div>
          <div className="space-y-3 mb-4">
            {referralBy.map((r, i) => (
              <div key={r.name} className="flex items-center gap-3">
                <span className={`text-lg ${i === 0 ? "" : i === 1 ? "" : ""}`}>
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
                </span>
                <Avatar name={r.name} size="sm" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-700">{r.name}</p>
                  <p className="text-xs text-gray-400">Merujuk {r.referred} pelanggan baru</p>
                </div>
                <Badge type="primary">{r.referred}x</Badge>
              </div>
            ))}
          </div>
          <div className="bg-purple-50 rounded-xl p-3 border border-purple-100">
            <p className="text-xs font-bold text-purple-700 mb-1">Cara kerja Referral:</p>
            <ul className="text-xs text-purple-600 space-y-0.5">
              <li>✓ Pelanggan mengajak teman baru → dapat 200 poin</li>
              <li>✓ Teman baru mendapat diskon 20% pertama</li>
              <li>✓ Poin bisa ditukar diskon transaksi berikutnya</li>
            </ul>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Tab Nav */}
        <div className="flex border-b border-gray-100">
          {[
            { key: "promo",    label: "Data Promo",       icon: <MdLocalOffer size={15}/> },
            { key: "campaign", label: "Riwayat Campaign", icon: <MdCampaign size={15}/>   },
            { key: "referral", label: "Daftar Referral",  icon: <MdPeople size={15}/>     },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-5 py-3.5 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "border-b-2 border-[#6344f2] text-[#6344f2]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {/* TAB: Data Promo */}
          {activeTab === "promo" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <div className="flex-1">
                  <InputField
                    placeholder="Cari promo..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    icon={<MdSearch size={16} />}
                  />
                </div>
                <div className="w-full sm:w-44">
                  <SelectField
                    value={filterStatus}
                    onChange={(e) => setFilter(e.target.value)}
                    options={["Aktif", "Berakhir", "Mendatang"]}
                    placeholder="Semua Status"
                  />
                </div>
                <span className="text-sm text-gray-400 shrink-0">{filteredPromos.length} promo</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider">
                    <tr>
                      {promoTableHeaders.map((h, i) => (
                        <th key={i} className="px-4 py-3 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 bg-white">
                    {filteredPromos.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50/60">
                        <td className="px-4 py-3">
                          <p className="font-semibold text-gray-800 text-sm">{p.name}</p>
                          <p className="text-[10px] text-gray-400">{p.id}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${promoTypeColor[p.type] ?? "bg-gray-100 text-gray-600"}`}>
                            {p.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-bold text-[#6344f2] text-sm">{p.discount}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{p.target}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {p.channel.map((ch) => (
                              <span key={ch} className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${channelColor[ch] ?? "bg-gray-100 text-gray-500"}`}>
                                {ch}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-400">
                          <div>{p.startDate}</div>
                          <div>s/d {p.endDate}</div>
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-gray-700">{p.usageCount}x</td>
                        <td className="px-4 py-3">
                          <Badge type={promoStatusType[p.status] ?? "secondary"}>{p.status}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Button type="outline" className="px-3 py-1 text-xs" onClick={() => setSelected(p)}>
                            Detail
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: Riwayat Campaign */}
          {activeTab === "campaign" && (
            <div className="space-y-3">
              <p className="text-sm text-gray-500">Total {campaignHistory.length} penggunaan promo oleh pelanggan</p>
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider">
                    <tr>
                      {["Pelanggan", "Promo Digunakan", "Tipe", "Digunakan Pada", "Hemat"].map((h, i) => (
                        <th key={i} className="px-4 py-3 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 bg-white">
                    {campaignHistory.map((cc, i) => (
                      <tr key={i} className="hover:bg-gray-50/60">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Avatar name={cc.customerName} size="sm" />
                            <span className="font-semibold text-gray-700 text-sm">{cc.customerName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{cc.promoName}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${promoTypeColor[cc.promoType] ?? "bg-gray-100 text-gray-600"}`}>
                            {cc.promoType}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-400">{cc.usedAt}</td>
                        <td className="px-4 py-3 text-sm font-bold text-emerald-600">
                          {cc.saving > 0 ? `Rp ${cc.saving.toLocaleString("id-ID")}` : <span className="text-gray-400 font-normal">Poin</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: Daftar Referral */}
          {activeTab === "referral" && (
            <div className="space-y-3">
              <p className="text-sm text-gray-500">{referralCustomers.length} pelanggan bergabung melalui program referral</p>
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider">
                    <tr>
                      {["Pelanggan Baru", "Bergabung", "Sumber", "Dirujuk Oleh", "Membership"].map((h, i) => (
                        <th key={i} className="px-4 py-3 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 bg-white">
                    {referralCustomers.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50/60">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Avatar name={c.name} size="sm" />
                            <div>
                              <p className="font-semibold text-gray-800">{c.name}</p>
                              <p className="text-xs text-gray-400">{c.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-400">{c.joined}</td>
                        <td className="px-4 py-3">
                          <Badge type="primary">{c.source}</Badge>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-purple-700">{c.referral}</td>
                        <td className="px-4 py-3">
                          <Badge type={c.membership === "Gold" ? "primary" : c.membership === "Silver" ? "secondary" : "warning"}>
                            {c.membership === "Gold" ? "🥇" : c.membership === "Silver" ? "🥈" : "🥉"} {c.membership}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Promo Detail Modal */}
      <Modal isOpen={!!selectedPromo} onClose={() => setSelected(null)} title={`Detail Promo — ${selectedPromo?.id}`}>
        {selectedPromo && (
          <div className="space-y-4 text-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-gray-800 text-base">{selectedPromo.name}</p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${promoTypeColor[selectedPromo.type] ?? "bg-gray-100"}`}>
                  {selectedPromo.type}
                </span>
              </div>
              <Badge type={promoStatusType[selectedPromo.status]}>{selectedPromo.status}</Badge>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              {[
                ["Diskon/Benefit", selectedPromo.discount],
                ["Target",         selectedPromo.target],
                ["Min. Transaksi", selectedPromo.minOrder > 0 ? `Rp ${selectedPromo.minOrder.toLocaleString("id-ID")}` : "Tidak ada minimum"],
                ["Periode",        `${selectedPromo.startDate} – ${selectedPromo.endDate}`],
                ["Penggunaan",     `${selectedPromo.usageCount} kali`],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between">
                  <span className="text-gray-400">{l}</span>
                  <span className="font-semibold text-gray-700">{v}</span>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-bold text-gray-500 mb-1">Deskripsi</p>
              <p className="text-xs text-gray-600 bg-blue-50 rounded-lg p-3">{selectedPromo.description}</p>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-500 mb-2">Channel Distribusi</p>
              <div className="flex flex-wrap gap-2">
                {selectedPromo.channel.map((ch) => (
                  <span key={ch} className={`text-xs font-semibold px-3 py-1 rounded-full ${channelColor[ch] ?? "bg-gray-100"}`}>
                    {ch}
                  </span>
                ))}
              </div>
            </div>

            <Button type="secondary" className="w-full" onClick={() => setSelected(null)}>Tutup</Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
