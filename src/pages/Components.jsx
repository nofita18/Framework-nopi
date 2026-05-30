import { useState } from "react";
import { MdLocalLaundryService, MdPeople, MdReceiptLong, MdPayments, MdSearch } from "react-icons/md";

import PageHeader    from "../components/PageHeader";
import Container     from "../components/Container";
import Button        from "../components/Button";
import Badge         from "../components/Badge";
import Avatar        from "../components/Avatar";
import Card          from "../components/Card";
import LaundryCard   from "../components/LaundryCard";
import Table         from "../components/Table";
import InputField    from "../components/InputField";
import SelectField   from "../components/SelectField";
import TextArea      from "../components/TextArea";
import Alert         from "../components/Alert";
import Modal         from "../components/Modal";
import Spinner       from "../components/Spinner";
import StatsSection  from "../components/StatsSection";

// ── sample data ──────────────────────────────────────────────
const sampleStats = [
  { label: "Total Cucian",    value: "560",  change: "12%", up: true,  icon: <MdLocalLaundryService className="text-purple-500" />, bg: "bg-purple-50" },
  { label: "Pesanan Masuk",   value: "1050", change: "5%",  up: true,  icon: <MdReceiptLong className="text-indigo-500" />,         bg: "bg-indigo-50" },
  { label: "Total Pelanggan", value: "320",  change: "3%",  up: false, icon: <MdPeople className="text-pink-500" />,                bg: "bg-pink-50"   },
  { label: "Pendapatan",      value: "4.2M", change: "8%",  up: true,  icon: <MdPayments className="text-emerald-500" />,           bg: "bg-emerald-50"},
];

const sampleServices = [
  { id: 1, image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400", name: "Cuci Kiloan",   category: "Reguler", price: 7000,  duration: "2 hari",  availability: "Tersedia" },
  { id: 2, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", name: "Cuci Express",  category: "Express", price: 12000, duration: "6 jam",   availability: "Tersedia" },
  { id: 3, image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400", name: "Cuci Sepatu",   category: "Khusus",  price: 35000, duration: "1 hari",  availability: "Habis"    },
];

const tableHeaders = ["No", "Nama Pelanggan", "Layanan", "Berat", "Status", "Aksi"];
const tableRows = [
  { id: 1, name: "Budi Santoso",  service: "Cuci Kiloan",  weight: "3 kg",  status: "Selesai" },
  { id: 2, name: "Siti Aminah",   service: "Cuci Express", weight: "2 kg",  status: "Proses"  },
  { id: 3, name: "Andi Wijaya",   service: "Cuci Sepatu",  weight: "1 psg", status: "Antrian" },
];

const statusType = { Selesai: "success", Proses: "warning", Antrian: "info" };

// ── Section wrapper ───────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-bold text-gray-700 border-b border-gray-100 pb-2">{title}</h2>
      {children}
    </div>
  );
}

export default function Components() {
  const [modalOpen, setModalOpen]   = useState(false);
  const [inputVal, setInputVal]     = useState("");
  const [selectVal, setSelectVal]   = useState("");
  const [textareaVal, setTextareaVal] = useState("");

  return (
    <Container>
      <PageHeader
        title="Components"
        subtitle="Playground semua komponen UI LaundryPro"
        breadcrumb={["Dashboard", "Components"]}
      />

      <div className="space-y-10">

        {/* ── 1. BASIC COMPONENTS ── */}
        <Section title="1. Basic Component — Button">
          <div className="flex flex-wrap gap-3">
            <Button type="primary">Primary</Button>
            <Button type="secondary">Secondary</Button>
            <Button type="success">Simpan</Button>
            <Button type="danger">Hapus</Button>
            <Button type="warning">Peringatan</Button>
            <Button type="outline">Outline</Button>
          </div>
        </Section>

        <Section title="1. Basic Component — Badge">
          <div className="flex flex-wrap gap-3 items-center">
            <Badge type="primary">Baru</Badge>
            <Badge type="success">Selesai</Badge>
            <Badge type="warning">Proses</Badge>
            <Badge type="danger">Dibatalkan</Badge>
            <Badge type="info">Antrian</Badge>
            <Badge type="secondary">Reguler</Badge>
          </div>
        </Section>

        <Section title="1. Basic Component — Avatar">
          <div className="flex items-center gap-4">
            <Avatar name="Budi Santoso" size="sm" />
            <Avatar name="Siti Aminah" size="md" />
            <Avatar name="Andi Wijaya" size="lg" />
            <Avatar name="Dewi Lestari" image="https://i.pravatar.cc/150?u=10" size="md" />
          </div>
        </Section>

        {/* ── 2. LAYOUT COMPONENTS ── */}
        <Section title="2. Layout Component — Container">
          <Container className="bg-purple-50 rounded-2xl">
            <p className="text-sm text-purple-700 font-medium">
              Ini adalah contoh Container — membungkus konten dengan padding dan lebar penuh.
            </p>
          </Container>
        </Section>

        <Section title="2. Layout Component — PageHeader">
          <Card>
            <PageHeader
              title="Manajemen Pesanan"
              subtitle="Kelola semua pesanan laundry masuk"
              breadcrumb={["Dashboard", "Pesanan"]}
            />
          </Card>
        </Section>

        {/* ── 3. DATA DISPLAY COMPONENTS ── */}
        <Section title="3. Data Display Component — Card">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Ringkasan Hari Ini</h3>
              <p className="text-sm text-gray-500">Total 24 pesanan masuk, 18 sudah selesai diproses.</p>
            </Card>
            <Card className="bg-purple-50 border-purple-100">
              <h3 className="text-lg font-bold text-purple-700 mb-1">Promo Hari Ini</h3>
              <p className="text-sm text-purple-500">Diskon 20% untuk layanan Cuci Express!</p>
            </Card>
          </div>
        </Section>

        <Section title="3. Data Display Component — LaundryCard">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {sampleServices.map((s) => (
              <LaundryCard key={s.id} {...s} />
            ))}
          </div>
        </Section>

        <Section title="3. Data Display Component — Table">
          <Table headers={tableHeaders}>
            {tableRows.map((row, i) => (
              <tr key={row.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-4 text-gray-500">{i + 1}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={row.name} size="sm" />
                    <span className="font-semibold text-gray-700">{row.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-500">{row.service}</td>
                <td className="px-5 py-4 text-gray-500">{row.weight}</td>
                <td className="px-5 py-4">
                  <Badge type={statusType[row.status]}>{row.status}</Badge>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <Button type="outline" className="px-3 py-1 text-xs">Detail</Button>
                    <Button type="danger" className="px-3 py-1 text-xs">Hapus</Button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        </Section>

        {/* ── 4. FORM COMPONENTS ── */}
        <Section title="4. Form Component — InputField">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <InputField
              label="Nama Pelanggan"
              placeholder="Masukkan nama..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              icon={<MdPeople size={16} />}
            />
            <InputField
              label="Cari Pesanan"
              type="text"
              placeholder="No. pesanan / nama..."
              icon={<MdSearch size={16} />}
            />
          </div>
        </Section>

        <Section title="4. Form Component — SelectField">
          <div className="max-w-xs">
            <SelectField
              label="Jenis Layanan"
              value={selectVal}
              onChange={(e) => setSelectVal(e.target.value)}
              options={["Cuci Kiloan", "Cuci Express", "Cuci Sepatu", "Setrika"]}
              placeholder="Pilih layanan..."
            />
          </div>
        </Section>

        <Section title="4. Form Component — TextArea">
          <div className="max-w-md">
            <TextArea
              label="Catatan Pesanan"
              placeholder="Tulis catatan khusus untuk pesanan ini..."
              value={textareaVal}
              onChange={(e) => setTextareaVal(e.target.value)}
            />
          </div>
        </Section>

        {/* ── 5. FEEDBACK COMPONENTS ── */}
        <Section title="5. Feedback Component — Alert">
          <div className="space-y-3 max-w-xl">
            <Alert type="success" dismissible>Pesanan berhasil disimpan!</Alert>
            <Alert type="danger"  dismissible>Gagal memproses pembayaran. Coba lagi.</Alert>
            <Alert type="warning" dismissible>Stok deterjen hampir habis.</Alert>
            <Alert type="info">Sistem akan maintenance pada Minggu, 01 Juni 2026.</Alert>
          </div>
        </Section>

        <Section title="5. Feedback Component — Modal">
          <Button type="primary" onClick={() => setModalOpen(true)}>
            Buka Modal
          </Button>
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Konfirmasi Pesanan">
            <p className="text-sm text-gray-600 mb-4">
              Apakah kamu yakin ingin menyelesaikan pesanan ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3 justify-end">
              <Button type="secondary" onClick={() => setModalOpen(false)}>Batal</Button>
              <Button type="success"   onClick={() => setModalOpen(false)}>Ya, Selesaikan</Button>
            </div>
          </Modal>
        </Section>

        <Section title="5. Feedback Component — Spinner">
          <div className="flex items-center gap-8">
            <Spinner size="sm" />
            <Spinner size="md" label="Memuat data..." />
            <Spinner size="lg" label="Sedang memproses..." />
          </div>
        </Section>

        {/* ── 6. SECTION COMPONENT ── */}
        <Section title="6. Section Component — StatsSection">
          <StatsSection stats={sampleStats} />
        </Section>

      </div>
    </Container>
  );
}
