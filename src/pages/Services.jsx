import { useState } from "react";
import { MdSearch, MdAdd, MdLocalLaundryService } from "react-icons/md";

import laundryData from "../data/laundry_services.json";
import PageHeader from "../components/PageHeader";
import LaundryCard from "../components/LaundryCard";
import Button from "../components/Button";
import SelectField from "../components/SelectField";

// Shadcn UI Components
import { Input } from "@/components/ui/input";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Services() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setCategory] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    duration: "",
  });

  const allCategories = [
    ...new Set(laundryData.map((item) => item.category)),
  ];

  const filtered = laundryData.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    const matchCat = selectedCategory
      ? item.category === selectedCategory
      : true;

    return matchSearch && matchCat;
  });

  function handleSave() {
    console.log("Data tersimpan:", form);

    setModalOpen(false);

    setForm({
      name: "",
      category: "",
      price: "",
      duration: "",
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <PageHeader
          title="Layanan Laundry"
          subtitle="Kelola semua layanan yang tersedia"
          breadcrumb={["Dashboard", "Layanan"]}
        />

        <Button
          type="primary"
          onClick={() => setModalOpen(true)}
        >
          <span className="flex items-center gap-1.5">
            <MdAdd size={18} />
            Tambah Layanan
          </span>
        </Button>
      </div>

      {/* Avatar Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="Admin"
          />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>

        <div>
          <h3 className="font-semibold">Admin Laundry</h3>
          <p className="text-sm text-gray-500">
            Kelola layanan laundry dan data pelanggan
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-3 items-center">
        <div className="flex-1">
          <div className="relative">
            <MdSearch
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <Input
              placeholder="Cari layanan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="w-full sm:w-52">
          <SelectField
            value={selectedCategory}
            onChange={(e) => setCategory(e.target.value)}
            options={allCategories}
            placeholder="Semua Kategori"
          />
        </div>

        <span className="text-sm text-gray-400 shrink-0">
          {filtered.length} layanan
        </span>
      </div>

      {/* Cards */}
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
          <MdLocalLaundryService
            size={40}
            className="mx-auto mb-2 opacity-30"
          />
          <p className="text-sm">
            Layanan tidak ditemukan
          </p>
        </div>
      )}

      {/* Dialog */}
      <Dialog
        open={modalOpen}
        onOpenChange={setModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Tambah Layanan Baru
            </DialogTitle>

            <DialogDescription>
              Masukkan data layanan laundry baru.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Nama Layanan
              </label>

              <Input
                placeholder="Contoh: Cuci Express"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <SelectField
              label="Kategori"
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
              options={allCategories}
              placeholder="Pilih kategori..."
            />

            <div>
              <label className="text-sm font-medium mb-1 block">
                Harga (Rp)
              </label>

              <Input
                type="number"
                placeholder="12000"
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Durasi
              </label>

              <Input
                placeholder="6 Jam"
                value={form.duration}
                onChange={(e) =>
                  setForm({
                    ...form,
                    duration: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="secondary"
              onClick={() => setModalOpen(false)}
            >
              Batal
            </Button>

            <Button
              type="success"
              onClick={handleSave}
            >
              Simpan Layanan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}