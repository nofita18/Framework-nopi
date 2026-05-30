import { useState } from "react";
import { MdSearch, MdAdd, MdLocalLaundryService } from "react-icons/md";

import laundryData  from "../data/laundry_services.json";
import PageHeader   from "../components/PageHeader";
import LaundryCard  from "../components/LaundryCard";
import Button       from "../components/Button";
import Modal        from "../components/Modal";
import SelectField  from "../components/SelectField";
import InputField   from "../components/InputField";

export default function Services() {
  const [search, setSearch]               = useState("");
  const [selectedCategory, setCategory]   = useState("");
  const [modalOpen, setModalOpen]         = useState(false);

  // form state
  const [form, setForm] = useState({ name: "", category: "", price: "", duration: "" });

  const allCategories = [...new Set(laundryData.map((item) => item.category))];

  const filtered = laundryData.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory ? item.category === selectedCategory : true;
    return matchSearch && matchCat;
  });

  function handleSave() {
    // placeholder — integrasi data bisa ditambahkan
    setModalOpen(false);
    setForm({ name: "", category: "", price: "", duration: "" });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <PageHeader
          title="Layanan Laundry"
          subtitle="Kelola semua layanan yang tersedia"
          breadcrumb={["Dashboard", "Layanan"]}
        />
        <Button type="primary" onClick={() => setModalOpen(true)}>
          <span className="flex items-center gap-1.5">
            <MdAdd size={18} /> Tambah Layanan
          </span>
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-3 items-center">
        <div className="flex-1">
          <InputField
            placeholder="Cari layanan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<MdSearch size={16} />}
          />
        </div>
        <div className="w-full sm:w-52">
          <SelectField
            value={selectedCategory}
            onChange={(e) => setCategory(e.target.value)}
            options={allCategories}
            placeholder="Semua Kategori"
          />
        </div>
        <span className="text-sm text-gray-400 shrink-0">{filtered.length} layanan</span>
      </div>

      {/* Cards Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item) => (
            <LaundryCard
              key={item.id}
              image={item.image}
              name={item.name}
              category={item.category}
              price={item.price}
              duration={`${item.details.duration} · ${item.details.unit}`}
              availability={item.details.availability}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 text-gray-400">
          <MdLocalLaundryService size={40} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">Layanan tidak ditemukan</p>
        </div>
      )}

      {/* Modal Tambah Layanan */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Tambah Layanan Baru">
        <div className="space-y-4">
          <InputField
            label="Nama Layanan"
            placeholder="cth. Cuci Express"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <SelectField
            label="Kategori"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            options={allCategories}
            placeholder="Pilih kategori..."
          />
          <InputField
            label="Harga (Rp)"
            type="number"
            placeholder="cth. 12000"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <InputField
            label="Durasi"
            placeholder="cth. 6 Jam"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          />
          <div className="flex gap-3 justify-end pt-2">
            <Button type="secondary" onClick={() => setModalOpen(false)}>Batal</Button>
            <Button type="success" onClick={handleSave}>Simpan Layanan</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
