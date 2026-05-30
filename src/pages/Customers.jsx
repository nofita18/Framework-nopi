import { useState } from "react";
import { MdSearch, MdAdd, MdPeople } from "react-icons/md";

import PageHeader from "../components/PageHeader";
import Table      from "../components/Table";
import Avatar     from "../components/Avatar";
import Badge      from "../components/Badge";
import InputField from "../components/InputField";
import Button     from "../components/Button";

const customersData = [
  { id: 1, name: "Andi Wijaya",   email: "andi@email.com",   phone: "081234567890", totalOrders: 12, totalSpent: 360000, joined: "Jan 2026", status: "Aktif"       },
  { id: 2, name: "Sari Dewi",     email: "sari@email.com",   phone: "082345678901", totalOrders: 8,  totalSpent: 192000, joined: "Feb 2026", status: "Aktif"       },
  { id: 3, name: "Budi Santoso",  email: "budi@email.com",   phone: "083456789012", totalOrders: 5,  totalSpent: 175000, joined: "Mar 2026", status: "Aktif"       },
  { id: 4, name: "Rina Marlina",  email: "rina@email.com",   phone: "084567890123", totalOrders: 15, totalSpent: 450000, joined: "Jan 2026", status: "Aktif"       },
  { id: 5, name: "Hendra Putra",  email: "hendra@email.com", phone: "085678901234", totalOrders: 3,  totalSpent: 90000,  joined: "Apr 2026", status: "Tidak Aktif" },
  { id: 6, name: "Dewi Lestari",  email: "dewi@email.com",   phone: "086789012345", totalOrders: 20, totalSpent: 700000, joined: "Des 2025", status: "Aktif"       },
  { id: 7, name: "Fajar Nugroho", email: "fajar@email.com",  phone: "087890123456", totalOrders: 7,  totalSpent: 350000, joined: "Feb 2026", status: "Aktif"       },
  { id: 8, name: "Gita Purnama",  email: "gita@email.com",   phone: "088901234567", totalOrders: 11, totalSpent: 440000, joined: "Mar 2026", status: "Aktif"       },
];

const tableHeaders = ["Pelanggan", "No. HP", "Total Pesanan", "Total Belanja", "Bergabung", "Status", "Aksi"];

export default function Customers() {
  const [search, setSearch] = useState("");

  const filtered = customersData.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <PageHeader
          title="Pelanggan"
          subtitle="Daftar semua pelanggan LaundryPro"
          breadcrumb={["Dashboard", "Pelanggan"]}
        />
        <Button type="primary">
          <span className="flex items-center gap-1.5">
            <MdAdd size={18} /> Tambah Pelanggan
          </span>
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
        <div className="max-w-sm w-full">
          <InputField
            placeholder="Cari nama, email, atau no. HP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<MdSearch size={16} />}
          />
        </div>
        <span className="text-sm text-gray-400">{filtered.length} pelanggan</span>
      </div>

      {/* Table */}
      {filtered.length > 0 ? (
        <Table headers={tableHeaders}>
          {filtered.map((c, i) => (
            <tr key={c.id} className="hover:bg-gray-50/60 transition-colors">
              {/* Pelanggan */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <Avatar name={c.name} size="md" />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.email}</p>
                  </div>
                </div>
              </td>
              {/* No HP */}
              <td className="px-5 py-4 text-sm text-gray-500">{c.phone}</td>
              {/* Total Pesanan */}
              <td className="px-5 py-4 text-sm font-medium text-gray-700">{c.totalOrders}x</td>
              {/* Total Belanja */}
              <td className="px-5 py-4 text-sm font-bold text-[#6344f2]">
                Rp {c.totalSpent.toLocaleString("id-ID")}
              </td>
              {/* Bergabung */}
              <td className="px-5 py-4 text-sm text-gray-400">{c.joined}</td>
              {/* Status */}
              <td className="px-5 py-4">
                <Badge type={c.status === "Aktif" ? "success" : "secondary"}>{c.status}</Badge>
              </td>
              {/* Aksi */}
              <td className="px-5 py-4">
                <div className="flex gap-2">
                  <Button type="outline" className="px-3 py-1 text-xs">Detail</Button>
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
    </div>
  );
}
