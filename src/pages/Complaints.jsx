import { useState } from "react";
import {
  MdSearch, MdAdd, MdSupportAgent, MdWarning,
  MdCheckCircle, MdPending, MdStar, MdStarOutline,
  MdNoteAlt, MdPhone,
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
import Alert       from "../components/Alert";
import TextArea    from "../components/TextArea";
import { complaints as complaintsData, customers, orders } from "../data/crmData";

const statusType = {
  Selesai: "success",
  Proses:  "warning",
  Aktif:   "danger",
};
const priorityType = {
  Tinggi: "danger",
  Sedang: "warning",
  Rendah: "secondary",
};
const categoryColor = {
  "Kualitas Cucian": "bg-orange-100 text-orange-700",
  "Keterlambatan":   "bg-yellow-100 text-yellow-700",
  "Barang Rusak":    "bg-red-100 text-red-700",
  "Kehilangan Item": "bg-red-100 text-red-700",
  "Harga":           "bg-blue-100 text-blue-700",
  "Lainnya":         "bg-gray-100 text-gray-600",
};

const tableHeaders = ["Tiket", "Pelanggan", "Pesanan", "Kategori", "Masalah", "Prioritas", "Tanggal", "Status", "Aksi"];
const categoryOptions = ["Kualitas Cucian", "Keterlambatan", "Barang Rusak", "Kehilangan Item", "Harga", "Lainnya"];
const statusOptions   = ["Aktif", "Proses", "Selesai"];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        s <= rating
          ? <MdStar key={s} className="text-yellow-400" size={14}/>
          : <MdStarOutline key={s} className="text-gray-300" size={14}/>
      ))}
    </div>
  );
}

export default function Complaints() {
  const [search, setSearch]         = useState("");
  const [filterStatus, setFilter]   = useState("");
  const [filterPriority, setFPriority] = useState("");
  const [selectedTicket, setSelected] = useState(null);
  const [addModalOpen, setAddModal]  = useState(false);
  const [showAlert, setShowAlert]    = useState(false);
  const [form, setForm] = useState({ customer: "", orderId: "", category: "", issue: "", priority: "Sedang" });

  const filtered = complaintsData.filter((c) => {
    const matchSearch =
      c.customer.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.issue.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus   = filterStatus   ? c.status === filterStatus     : true;
    const matchPriority = filterPriority ? c.priority === filterPriority : true;
    return matchSearch && matchStatus && matchPriority;
  });

  // Summary stats
  const aktif    = complaintsData.filter((c) => c.status === "Aktif").length;
  const proses   = complaintsData.filter((c) => c.status === "Proses").length;
  const selesai  = complaintsData.filter((c) => c.status === "Selesai").length;
  const withRating = complaintsData.filter((c) => c.rating !== null);
  const avgRating  = withRating.length > 0
    ? (withRating.reduce((s, c) => s + c.rating, 0) / withRating.length).toFixed(1)
    : "—";

  function handleSave() {
    setAddModal(false);
    setShowAlert(true);
    setForm({ customer: "", orderId: "", category: "", issue: "", priority: "Sedang" });
    setTimeout(() => setShowAlert(false), 4000);
  }

  // Riwayat layanan pelanggan (dari komplain)
  function getCustomerHistory(customerId) {
    return complaintsData.filter((c) => c.customerId === customerId);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <PageHeader
          title="Service"
          subtitle="Tiket komplain, riwayat layanan pelanggan, dan rating kepuasan CRM"
          breadcrumb={["Dashboard", "Service"]}
        />
        <Button type="primary" onClick={() => setAddModal(true)}>
          <span className="flex items-center gap-1.5"><MdAdd size={18} /> Buat Tiket</span>
        </Button>
      </div>

      {showAlert && (
        <Alert type="success" dismissible>Tiket komplain berhasil dibuat!</Alert>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Komplain Aktif",   value: aktif,   icon: <MdWarning className="text-red-500" size={18}/>,       bg: "bg-red-50",     text: "text-red-600"     },
          { label: "Sedang Diproses",  value: proses,  icon: <MdPending className="text-orange-500" size={18}/>,    bg: "bg-orange-50",  text: "text-orange-600"  },
          { label: "Sudah Selesai",    value: selesai, icon: <MdCheckCircle className="text-emerald-500" size={18}/>,bg: "bg-emerald-50", text: "text-emerald-600" },
          { label: "Rata-rata Rating", value: avgRating, icon: <MdStar className="text-yellow-400" size={18}/>,     bg: "bg-yellow-50",  text: "text-yellow-600"  },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>{s.icon}</div>
            <p className={`text-2xl font-bold ${s.text}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Rating & Reviews Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-3 items-center mb-4">
            <div className="flex-1">
              <InputField
                placeholder="Cari tiket, pelanggan, atau masalah..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={<MdSearch size={16} />}
              />
            </div>
            <div className="w-full sm:w-36">
              <SelectField
                value={filterStatus}
                onChange={(e) => setFilter(e.target.value)}
                options={statusOptions}
                placeholder="Semua Status"
              />
            </div>
            <div className="w-full sm:w-36">
              <SelectField
                value={filterPriority}
                onChange={(e) => setFPriority(e.target.value)}
                options={["Tinggi", "Sedang", "Rendah"]}
                placeholder="Semua Prioritas"
              />
            </div>
            <span className="text-sm text-gray-400 shrink-0">{filtered.length} tiket</span>
          </div>

          {/* Table */}
          {filtered.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider">
                  <tr>
                    {tableHeaders.map((h, i) => (
                      <th key={i} className="px-4 py-3 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 bg-white">
                  {filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-4 py-4 text-xs font-mono text-gray-500">{c.id}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Avatar name={c.customer} size="sm" />
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">{c.customer}</p>
                            <p className="text-xs text-gray-400">{c.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-xs font-mono text-gray-500">{c.orderId}</td>
                      <td className="px-4 py-4">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColor[c.category] ?? "bg-gray-100 text-gray-600"}`}>
                          {c.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-600 max-w-[180px]">
                        <p className="truncate">{c.issue}</p>
                      </td>
                      <td className="px-4 py-4">
                        <Badge type={priorityType[c.priority] ?? "secondary"}>{c.priority}</Badge>
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-400">{c.createdAt}</td>
                      <td className="px-4 py-4">
                        <Badge type={statusType[c.status] ?? "secondary"}>{c.status}</Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Button type="outline" className="px-3 py-1 text-xs" onClick={() => setSelected(c)}>
                          Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 text-gray-400">
              <MdSupportAgent size={40} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">Tiket tidak ditemukan</p>
            </div>
          )}
        </div>

        {/* Rating & Review Panel */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <MdStar className="text-yellow-400" size={18} />
            <h3 className="font-bold text-gray-800">Rating & Ulasan</h3>
          </div>

          {/* Avg Rating */}
          <div className="text-center mb-5 py-4 bg-yellow-50 rounded-xl border border-yellow-100">
            <p className="text-4xl font-bold text-yellow-600">{avgRating}</p>
            <div className="flex justify-center mt-1">
              {[1,2,3,4,5].map((s) => (
                s <= Math.round(parseFloat(avgRating))
                  ? <MdStar key={s} className="text-yellow-400" size={18}/>
                  : <MdStarOutline key={s} className="text-gray-300" size={18}/>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">{withRating.length} ulasan</p>
          </div>

          {/* Rating distribution */}
          <div className="space-y-2 mb-5">
            {[5,4,3,2,1].map((r) => {
              const count = withRating.filter((c) => c.rating === r).length;
              const pct   = withRating.length > 0 ? (count / withRating.length) * 100 : 0;
              return (
                <div key={r} className="flex items-center gap-2 text-xs">
                  <span className="text-gray-500 w-8">{r} ⭐</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div className="h-2 rounded-full bg-yellow-400" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-gray-400 w-6 text-right">{count}</span>
                </div>
              );
            })}
          </div>

          {/* Latest Reviews */}
          <p className="text-xs font-bold text-gray-500 mb-3">Ulasan Terbaru</p>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {complaintsData.filter((c) => c.review !== null).map((c) => (
              <div key={c.id} className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Avatar name={c.customer} size="sm" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-700">{c.customer}</p>
                    <StarRating rating={c.rating} />
                  </div>
                </div>
                <p className="text-xs text-gray-500 italic">"{c.review}"</p>
                <p className="text-[10px] text-gray-400 mt-1">{c.resolvedAt}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Tiket Detail Modal */}
      <Modal isOpen={!!selectedTicket} onClose={() => setSelected(null)} title={`Tiket — ${selectedTicket?.id}`}>
        {selectedTicket && (() => {
          const histori = getCustomerHistory(selectedTicket.customerId);
          return (
            <div className="space-y-4 text-sm max-h-[70vh] overflow-y-auto pr-1">
              {/* Header */}
              <div className="flex items-center gap-3">
                <Avatar name={selectedTicket.customer} size="lg" />
                <div>
                  <p className="font-bold text-gray-800">{selectedTicket.customer}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <MdPhone size={12}/>{selectedTicket.phone}
                  </div>
                  <p className="text-xs text-gray-400 font-mono">{selectedTicket.orderId}</p>
                </div>
              </div>

              {/* Status & Priority */}
              <div className="flex items-center gap-3">
                <Badge type={statusType[selectedTicket.status]}>{selectedTicket.status}</Badge>
                <Badge type={priorityType[selectedTicket.priority]}>Prioritas: {selectedTicket.priority}</Badge>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColor[selectedTicket.category] ?? "bg-gray-100"}`}>
                  {selectedTicket.category}
                </span>
              </div>

              {/* Issue */}
              <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                <p className="text-xs font-bold text-red-600 mb-1">Keluhan Pelanggan</p>
                <p className="text-sm text-gray-700">{selectedTicket.issue}</p>
              </div>

              {/* Timeline */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-500">Timeline</p>
                <div className="flex gap-3 text-xs">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-[#6344f2]" />
                    <div className="w-0.5 flex-1 bg-gray-200 my-1" />
                    {selectedTicket.resolvedAt && <div className="w-3 h-3 rounded-full bg-emerald-500" />}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-gray-700">Tiket Dibuat</p>
                      <p className="text-gray-400">{selectedTicket.createdAt}</p>
                    </div>
                    {selectedTicket.resolvedAt && (
                      <div>
                        <p className="font-semibold text-emerald-600">Tiket Diselesaikan</p>
                        <p className="text-gray-400">{selectedTicket.resolvedAt}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Admin Note */}
              <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                <div className="flex items-center gap-1 mb-1">
                  <MdNoteAlt size={14} className="text-blue-600" />
                  <p className="text-xs font-bold text-blue-600">Catatan Admin</p>
                </div>
                <p className="text-xs text-gray-600">{selectedTicket.adminNote}</p>
              </div>

              {/* Rating & Review */}
              {selectedTicket.rating !== null && (
                <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-100">
                  <p className="text-xs font-bold text-yellow-700 mb-1">Rating Pelanggan</p>
                  <StarRating rating={selectedTicket.rating} />
                  {selectedTicket.review && (
                    <p className="text-xs text-gray-600 italic mt-1">"{selectedTicket.review}"</p>
                  )}
                </div>
              )}

              {/* Riwayat Layanan */}
              {histori.length > 1 && (
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-2">Riwayat Layanan Pelanggan</p>
                  <div className="space-y-1">
                    {histori.map((h) => (
                      <div key={h.id} className={`flex items-center justify-between text-xs rounded-lg px-3 py-2 ${h.id === selectedTicket.id ? "bg-purple-50 border border-purple-100" : "bg-gray-50"}`}>
                        <span className="font-mono text-gray-400">{h.id}</span>
                        <span className="text-gray-600 truncate mx-2">{h.category}</span>
                        <Badge type={statusType[h.status] ?? "secondary"}>{h.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button type="secondary" className="w-full" onClick={() => setSelected(null)}>Tutup</Button>
            </div>
          );

          function StarRating({ rating }) {
            return (
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  s <= rating
                    ? <MdStar key={s} className="text-yellow-400" size={14}/>
                    : <MdStarOutline key={s} className="text-gray-300" size={14}/>
                ))}
              </div>
            );
          }
        })()}
      </Modal>

      {/* Modal Buat Tiket Baru */}
      <Modal isOpen={addModalOpen} onClose={() => setAddModal(false)} title="Buat Tiket Komplain">
        <div className="space-y-4">
          <Alert type="warning">Isi data komplain dengan lengkap untuk mempercepat penanganan.</Alert>
          <InputField label="Nama Pelanggan" placeholder="cth. Budi Santoso" value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} />
          <InputField label="ID Pesanan Terkait" placeholder="cth. ORD-001" value={form.orderId} onChange={(e) => setForm({ ...form, orderId: e.target.value })} />
          <SelectField label="Kategori Komplain" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} options={categoryOptions} placeholder="Pilih kategori..." />
          <SelectField label="Prioritas" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} options={["Rendah","Sedang","Tinggi"]} placeholder="Pilih prioritas..." />
          <TextArea label="Deskripsi Masalah" placeholder="Jelaskan masalah secara detail..." value={form.issue} onChange={(e) => setForm({ ...form, issue: e.target.value })} rows={3} />
          <div className="flex gap-3 justify-end pt-1">
            <Button type="secondary" onClick={() => setAddModal(false)}>Batal</Button>
            <Button type="danger" onClick={handleSave}>Buat Tiket</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
