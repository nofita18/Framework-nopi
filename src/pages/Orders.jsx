import { useState } from "react";
import {
  MdSearch, MdAdd, MdReceiptLong, MdTrendingUp,
  MdCheckCircle, MdPending, MdLocalLaundryService,
} from "react-icons/md";

import PageHeader  from "../components/PageHeader";
import Table       from "../components/Table";
import Badge       from "../components/Badge";
import Modal       from "../components/Modal";
import Alert       from "../components/Alert";
import TextArea    from "../components/TextArea";
import SelectField from "../components/SelectField";
import Button      from "../components/Button";
import InputField  from "../components/InputField";
import Avatar      from "../components/Avatar";
import { orders as ordersData, customers } from "../data/crmData";

const tableHeaders = ["ID Pesanan", "Pelanggan", "Layanan", "Berat/Qty", "Total", "Tanggal", "Status", "Aksi"];
const statusType   = {
  Selesai:       "success",
  Diterima:      "info",
  Dicuci:        "warning",
  Disetrika:     "warning",
  "Siap Diambil":"primary",
  Proses:        "warning",
  Antrian:       "info",
  Dibatalkan:    "danger",
};
const statusFlow = ["Diterima", "Dicuci", "Disetrika", "Siap Diambil", "Selesai"];

const layananOptions = ["Cuci Kiloan","Cuci Express","Cuci + Setrika","Setrika Saja","Dry Cleaning","Cuci Sepatu","Cuci Tas","Cuci Karpet","Cuci Bed Cover","Cuci Selimut"];
const statusOptions  = ["Diterima","Dicuci","Disetrika","Siap Diambil","Selesai","Dibatalkan"];

export default function Orders() {
  const [search, setSearch]           = useState("");
  const [filterStatus, setFilter]     = useState("");
  const [modalOpen, setModalOpen]     = useState(false);
  const [detailOrder, setDetailOrder] = useState(null);
  const [showAlert, setShowAlert]     = useState(false);
  const [form, setForm] = useState({ customer: "", phone: "", service: "", weight: "", catatan: "" });

  const filtered = ordersData.filter((o) => {
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.service.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus ? o.status === filterStatus : true;
    return matchSearch && matchStatus;
  });

  // Revenue summary
  const selesai = ordersData.filter((o) => o.status === "Selesai");
  const totalRev = selesai.reduce((s, o) => s + o.total, 0);
  const aktif    = ordersData.filter((o) => !["Selesai","Dibatalkan"].includes(o.status));

  function handleSave() {
    setModalOpen(false);
    setShowAlert(true);
    setForm({ customer: "", phone: "", service: "", weight: "", catatan: "" });
    setTimeout(() => setShowAlert(false), 4000);
  }

  function getStatusStep(status) {
    return statusFlow.indexOf(status);
  }

  function getCustomerMembership(customerId) {
    return customers.find((c) => c.id === customerId)?.membership ?? null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <PageHeader
          title="Pesanan — Sales Automation"
          subtitle="Riwayat transaksi, status pesanan, dan pendapatan pelanggan CRM"
          breadcrumb={["Dashboard", "Pesanan"]}
        />
        <Button type="primary" onClick={() => setModalOpen(true)}>
          <span className="flex items-center gap-1.5"><MdAdd size={18} /> Tambah Pesanan</span>
        </Button>
      </div>

      {showAlert && (
        <Alert type="success" dismissible>Pesanan baru berhasil ditambahkan!</Alert>
      )}

      {/* Revenue Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Pesanan",    value: ordersData.length,                 icon: <MdReceiptLong className="text-purple-500" size={18}/>, bg: "bg-purple-50" },
          { label: "Pesanan Aktif",    value: aktif.length,                      icon: <MdPending className="text-orange-500" size={18}/>,     bg: "bg-orange-50" },
          { label: "Sudah Selesai",    value: selesai.length,                    icon: <MdCheckCircle className="text-emerald-500" size={18}/>, bg: "bg-emerald-50"},
          { label: "Total Pendapatan", value: `Rp ${(totalRev/1000).toFixed(0)}K`, icon: <MdTrendingUp className="text-indigo-500" size={18}/>,  bg: "bg-indigo-50"  },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>{s.icon}</div>
            <p className="text-xl font-bold text-gray-800">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-3 items-center">
        <div className="flex-1">
          <InputField
            placeholder="Cari ID, nama pelanggan, atau layanan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<MdSearch size={16} />}
          />
        </div>
        <div className="w-full sm:w-52">
          <SelectField
            value={filterStatus}
            onChange={(e) => setFilter(e.target.value)}
            options={statusOptions}
            placeholder="Semua Status"
          />
        </div>
        <span className="text-sm text-gray-400 shrink-0">{filtered.length} pesanan</span>
      </div>

      {/* Table */}
      {filtered.length > 0 ? (
        <Table headers={tableHeaders}>
          {filtered.map((o) => {
            const membership = getCustomerMembership(o.customerId);
            return (
              <tr key={o.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-4 text-xs font-mono text-gray-500">{o.id}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Avatar name={o.customer} size="sm" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{o.customer}</p>
                      <p className="text-xs text-gray-400">{o.phone}</p>
                      {membership && (
                        <span className="text-[10px] font-bold text-gray-400">
                          {membership === "Gold" ? "🥇" : membership === "Silver" ? "🥈" : "🥉"} {membership}
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">{o.service}</td>
                <td className="px-5 py-4 text-sm text-gray-500">{o.weight}</td>
                <td className="px-5 py-4 text-sm font-bold text-[#6344f2]">Rp {o.total.toLocaleString("id-ID")}</td>
                <td className="px-5 py-4 text-xs text-gray-400">{o.date}</td>
                <td className="px-5 py-4">
                  <Badge type={statusType[o.status] ?? "secondary"}>{o.status}</Badge>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <Button type="outline" className="px-3 py-1 text-xs" onClick={() => setDetailOrder(o)}>Detail</Button>
                    <Button type="danger" className="px-3 py-1 text-xs">Hapus</Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </Table>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 text-gray-400">
          <MdReceiptLong size={40} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">Pesanan tidak ditemukan</p>
        </div>
      )}

      {/* Modal Tambah Pesanan */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Tambah Pesanan Baru">
        <div className="space-y-4">
          <Alert type="info">Isi data pesanan dengan lengkap dan benar.</Alert>
          <InputField label="Nama Pelanggan" placeholder="cth. Budi Santoso" value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} />
          <InputField label="No. HP" type="tel" placeholder="cth. 081234567890" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <SelectField label="Jenis Layanan" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} options={layananOptions} placeholder="Pilih layanan..." />
          <InputField label="Berat / Jumlah" placeholder="cth. 3 kg atau 1 pasang" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} />
          <TextArea label="Catatan Khusus" placeholder="cth. Jangan pakai pewangi, lipat rapi, dll." value={form.catatan} onChange={(e) => setForm({ ...form, catatan: e.target.value })} rows={3} />
          <div className="flex gap-3 justify-end pt-1">
            <Button type="secondary" onClick={() => setModalOpen(false)}>Batal</Button>
            <Button type="success" onClick={handleSave}>Simpan Pesanan</Button>
          </div>
        </div>
      </Modal>

      {/* Modal Detail Pesanan */}
      <Modal isOpen={!!detailOrder} onClose={() => setDetailOrder(null)} title={`Detail Pesanan — ${detailOrder?.id}`}>
        {detailOrder && (() => {
          const step = getStatusStep(detailOrder.status);
          const membership = getCustomerMembership(detailOrder.customerId);
          return (
            <div className="space-y-4 text-sm">
              {/* Customer */}
              <div className="flex items-center gap-3 mb-2">
                <Avatar name={detailOrder.customer} size="lg" />
                <div>
                  <p className="font-bold text-gray-800">{detailOrder.customer}</p>
                  <p className="text-gray-400 text-xs">{detailOrder.phone}</p>
                  {membership && <Badge type={membership === "Gold" ? "primary" : membership === "Silver" ? "secondary" : "warning"}>{membership === "Gold" ? "🥇" : membership === "Silver" ? "🥈" : "🥉"} {membership}</Badge>}
                </div>
              </div>

              {/* Status Flow */}
              {!["Dibatalkan","Antrian","Proses"].includes(detailOrder.status) && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-bold text-gray-500 mb-3">Status Pengerjaan</p>
                  <div className="flex items-center gap-1">
                    {statusFlow.map((s, i) => (
                      <div key={s} className="flex items-center flex-1">
                        <div className={`flex-1 text-center`}>
                          <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center text-[10px] font-bold ${i <= step ? "bg-[#6344f2] text-white" : "bg-gray-200 text-gray-400"}`}>
                            {i < step ? "✓" : i + 1}
                          </div>
                          <p className="text-[9px] text-gray-400 mt-1 leading-tight">{s}</p>
                        </div>
                        {i < statusFlow.length - 1 && (
                          <div className={`h-0.5 flex-1 ${i < step ? "bg-[#6344f2]" : "bg-gray-200"}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Details */}
              {[
                ["Layanan",   detailOrder.service],
                ["Berat/Qty", detailOrder.weight],
                ["Tanggal",   detailOrder.date],
                ["Total",     `Rp ${detailOrder.total.toLocaleString("id-ID")}`],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-400">{label}</span>
                  <span className="font-semibold text-gray-700">{val}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-1">
                <span className="text-gray-400">Status</span>
                <Badge type={statusType[detailOrder.status] ?? "secondary"}>{detailOrder.status}</Badge>
              </div>
              <Button type="secondary" className="w-full" onClick={() => setDetailOrder(null)}>Tutup</Button>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
