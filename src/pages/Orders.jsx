import { useState } from "react";
import { MdSearch, MdAdd, MdReceiptLong } from "react-icons/md";

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

const ordersData = [
  { id: "ORD-001", customer: "Budi Santoso",  phone: "081234567890", service: "Cuci Kiloan",    weight: "3 kg",  total: 21000,  status: "Selesai",  date: "14 Jul 2026" },
  { id: "ORD-002", customer: "Siti Aminah",   phone: "082345678901", service: "Cuci Express",   weight: "2 kg",  total: 24000,  status: "Proses",   date: "14 Jul 2026" },
  { id: "ORD-003", customer: "Andi Wijaya",   phone: "083456789012", service: "Cuci Sepatu",    weight: "1 psg", total: 25000,  status: "Antrian",  date: "14 Jul 2026" },
  { id: "ORD-004", customer: "Dewi Lestari",  phone: "084567890123", service: "Dry Cleaning",   weight: "2 item",total: 70000,  status: "Selesai",  date: "13 Jul 2026" },
  { id: "ORD-005", customer: "Rizky Pratama", phone: "085678901234", service: "Cuci + Setrika", weight: "4 kg",  total: 40000,  status: "Proses",   date: "13 Jul 2026" },
  { id: "ORD-006", customer: "Rina Marlina",  phone: "086789012345", service: "Cuci Bed Cover", weight: "1 item",total: 30000,  status: "Antrian",  date: "13 Jul 2026" },
  { id: "ORD-007", customer: "Fajar Nugroho", phone: "087890123456", service: "Setrika Saja",   weight: "3 kg",  total: 15000,  status: "Dibatalkan",date:"12 Jul 2026" },
];

const tableHeaders = ["ID Pesanan", "Pelanggan", "Layanan", "Berat/Qty", "Total", "Tanggal", "Status", "Aksi"];
const statusType   = { Selesai: "success", Proses: "warning", Antrian: "info", Dibatalkan: "danger" };
const layananOptions = ["Cuci Kiloan","Cuci Express","Cuci + Setrika","Setrika Saja","Dry Cleaning","Cuci Sepatu","Cuci Tas","Cuci Karpet","Cuci Bed Cover"];
const statusOptions  = ["Antrian","Proses","Selesai","Dibatalkan"];

export default function Orders() {
  const [search, setSearch]           = useState("");
  const [filterStatus, setFilter]     = useState("");
  const [modalOpen, setModalOpen]     = useState(false);
  const [detailOrder, setDetailOrder] = useState(null);
  const [showAlert, setShowAlert]     = useState(false);

  // form tambah pesanan
  const [form, setForm] = useState({ customer: "", phone: "", service: "", weight: "", catatan: "" });

  const filtered = ordersData.filter((o) => {
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.service.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus ? o.status === filterStatus : true;
    return matchSearch && matchStatus;
  });

  function handleSave() {
    setModalOpen(false);
    setShowAlert(true);
    setForm({ customer: "", phone: "", service: "", weight: "", catatan: "" });
    setTimeout(() => setShowAlert(false), 4000);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <PageHeader
          title="Pesanan"
          subtitle="Kelola semua pesanan laundry masuk"
          breadcrumb={["Dashboard", "Pesanan"]}
        />
        <Button type="primary" onClick={() => setModalOpen(true)}>
          <span className="flex items-center gap-1.5">
            <MdAdd size={18} /> Tambah Pesanan
          </span>
        </Button>
      </div>

      {/* Alert sukses */}
      {showAlert && (
        <Alert type="success" dismissible>
          Pesanan baru berhasil ditambahkan!
        </Alert>
      )}

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
        <div className="w-full sm:w-48">
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
          {filtered.map((o) => (
            <tr key={o.id} className="hover:bg-gray-50/60 transition-colors">
              <td className="px-5 py-4 text-xs font-mono text-gray-500">{o.id}</td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <Avatar name={o.customer} size="sm" />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{o.customer}</p>
                    <p className="text-xs text-gray-400">{o.phone}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 text-sm text-gray-600">{o.service}</td>
              <td className="px-5 py-4 text-sm text-gray-500">{o.weight}</td>
              <td className="px-5 py-4 text-sm font-bold text-[#6344f2]">
                Rp {o.total.toLocaleString("id-ID")}
              </td>
              <td className="px-5 py-4 text-xs text-gray-400">{o.date}</td>
              <td className="px-5 py-4">
                <Badge type={statusType[o.status] ?? "secondary"}>{o.status}</Badge>
              </td>
              <td className="px-5 py-4">
                <div className="flex gap-2">
                  <Button type="outline" className="px-3 py-1 text-xs" onClick={() => setDetailOrder(o)}>
                    Detail
                  </Button>
                  <Button type="danger" className="px-3 py-1 text-xs">Hapus</Button>
                </div>
              </td>
            </tr>
          ))}
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
          <InputField
            label="Nama Pelanggan"
            placeholder="cth. Budi Santoso"
            value={form.customer}
            onChange={(e) => setForm({ ...form, customer: e.target.value })}
          />
          <InputField
            label="No. HP"
            type="tel"
            placeholder="cth. 081234567890"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <SelectField
            label="Jenis Layanan"
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            options={layananOptions}
            placeholder="Pilih layanan..."
          />
          <InputField
            label="Berat / Jumlah"
            placeholder="cth. 3 kg atau 1 pasang"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
          />
          <TextArea
            label="Catatan Khusus"
            placeholder="cth. Jangan pakai pewangi, lipat rapi, dll."
            value={form.catatan}
            onChange={(e) => setForm({ ...form, catatan: e.target.value })}
            rows={3}
          />
          <div className="flex gap-3 justify-end pt-1">
            <Button type="secondary" onClick={() => setModalOpen(false)}>Batal</Button>
            <Button type="success" onClick={handleSave}>Simpan Pesanan</Button>
          </div>
        </div>
      </Modal>

      {/* Modal Detail Pesanan */}
      <Modal
        isOpen={!!detailOrder}
        onClose={() => setDetailOrder(null)}
        title={`Detail Pesanan — ${detailOrder?.id}`}
      >
        {detailOrder && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 mb-4">
              <Avatar name={detailOrder.customer} size="lg" />
              <div>
                <p className="font-bold text-gray-800">{detailOrder.customer}</p>
                <p className="text-gray-400 text-xs">{detailOrder.phone}</p>
              </div>
            </div>
            {[
              ["Layanan",  detailOrder.service],
              ["Berat/Qty",detailOrder.weight],
              ["Tanggal",  detailOrder.date],
              ["Total",    `Rp ${detailOrder.total.toLocaleString("id-ID")}`],
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
            <div className="pt-3">
              <Button type="secondary" className="w-full" onClick={() => setDetailOrder(null)}>
                Tutup
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
