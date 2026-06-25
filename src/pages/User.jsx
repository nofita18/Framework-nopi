import { useState, useEffect } from "react";
import { MdPeople, MdSearch, MdPersonAdd } from "react-icons/md"; // Tambah ikon penunjang form
import { AiFillDelete } from "react-icons/ai";
import { userAPI } from "../services/userAPI";
import PageHeader from "../components/PageHeader";
import Container from "../components/Container";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import AlertBox from "../components/AlertBox";
import Badge from "../components/Badge";
import InputField from "../components/InputField";

export default function User() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch]   = useState("");

  // 💡 State Baru untuk Form Tambah User
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState({ name: "", email: "", password: "", role: "user" });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await userAPI.fetchUsers();
      setUsers(data);
    } catch (err) {
      setError("Gagal memuat data user: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 💡 Fungsi Baru untuk Handle Input Form Tambah User
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 💡 Fungsi Baru untuk Submit Data User oleh Admin
  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // Kirim ke Supabase via file API yang sama dengan register
      await userAPI.registerUser({
        ...form,
        created_at: new Date().toISOString()
      });

      setSuccess(`User "${form.name}" berhasil ditambahkan!`);
      setForm({ name: "", email: "", password: "", role: "user" }); // Reset form
      setShowForm(false); // Sembunyikan form kembali
      setTimeout(() => setSuccess(""), 3000);
      
      // Muat ulang data agar langsung muncul di tabel
      loadUsers();
    } catch (err) {
      setError("Gagal menambahkan user: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus user ini?");
    if (!konfirmasi) return;
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await userAPI.deleteUser(id);
      setSuccess("User berhasil dihapus.");
      setTimeout(() => setSuccess(""), 3000);
      loadUsers();
    } catch (err) {
      setError("Gagal menghapus user: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filtered = users.filter(
    (u) =>
      (u.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (u.email ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (u.role ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <PageHeader
        title="Manajemen User — Admin"
        subtitle="Kelola data akun pengguna yang terdaftar di sistem"
        breadcrumb={["Dashboard", "Users"]}
      />

      {/* Alerts */}
      {error   && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total User",  value: users.length,                                color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Role Admin",  value: users.filter((u) => u.role === "admin").length,  color: "text-blue-600",   bg: "bg-blue-50"   },
          { label: "Role User",   value: users.filter((u) => u.role === "user").length,   color: "text-emerald-600",bg: "bg-emerald-50"},
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${s.bg} mb-3`}>
              <MdPeople className={s.color} size={18} />
            </div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search Bar & Action Buttons */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
        <div className="max-w-sm w-full flex items-center gap-3">
          <div className="w-full">
            <InputField
              placeholder="Cari nama, email, atau role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<MdSearch size={16} />}
            />
          </div>
          <span className="text-sm text-gray-400 shrink-0">{filtered.length} user</span>
        </div>

        {/* 💡 Tombol untuk memunculkan panel Form Tambah Data */}
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 text-white font-semibold text-sm rounded-xl transition-all shadow-sm ${
            showForm ? "bg-gray-500 hover:bg-gray-600" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {showForm ? "Batal" : <><MdPersonAdd size={16} /> Tambah User Baru</>}
        </button>
      </div>

      {/* 💡 Panel Form Kondisional Render (Muncul hanya jika tombol ditekan) */}
      {showForm && (
        <form onSubmit={handleAddUserSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
          <div className="md:col-span-2 border-b border-gray-100 pb-2 mb-1">
            <h3 className="font-bold text-gray-800 text-sm">Formulir Tambah Data Akun Baru</h3>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nama Lengkap</label>
            <input type="text" name="name" value={form.name} onChange={handleInputChange} required className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-purple-200 transition-all" placeholder="Masukkan nama" />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address</label>
            <input type="email" name="email" value={form.email} onChange={handleInputChange} required className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-purple-200 transition-all" placeholder="contoh@domain.com" />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Password Akses</label>
            <input type="password" name="password" value={form.password} onChange={handleInputChange} required className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-purple-200 transition-all" placeholder="Buat sandi akun" />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Hak Akses (Role)</label>
            <select name="role" value={form.role} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-purple-200 transition-all">
              <option value="user">User (Pelanggan)</option>
              <option value="admin">Admin (Pengelola)</option>
            </select>
          </div>
          
          <div className="md:col-span-2 flex justify-end gap-2 mt-2">
            <button type="submit" disabled={loading} className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl disabled:opacity-50 transition-all shadow-sm">
              {loading ? "Menyimpan ke Database..." : "Simpan User Baru"}
            </button>
          </div>
        </form>
      )}

      {/* Loading */}
      {loading && users.length === 0 && <LoadingSpinner text="Memuat data user..." />}

      {/* Empty State */}
      {!loading && users.length === 0 && !error && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 text-gray-400">
          <MdPeople size={40} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">Belum ada data user.</p>
        </div>
      )}

      {/* Table */}
      {!loading && filtered.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-800">
              Daftar User ({filtered.length})
            </h3>
            <Badge type="info">{filtered.length} akun</Badge>
          </div>

          <GenericTable
            columns={["#", "Nama", "Email", "Role", "Aksi"]}
            data={filtered}
            renderRow={(user, index) => (
              <>
                <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                  {index + 1}.
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm shrink-0">
                      {(user.name ?? user.email ?? "?").charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-800 text-sm">
                      {user.name ?? "-"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <Badge type={user.role === "admin" ? "primary" : "secondary"}>
                    {user.role ?? "user"}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(user.id)}
                    disabled={loading}
                    title="Hapus user"
                    className="p-1.5 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
                  >
                    <AiFillDelete className="text-red-400 text-xl hover:text-red-600 transition-colors" />
                  </button>
                </td>
              </>
            )}
          />
        </div>
      )}

      {/* No search result */}
      {!loading && users.length > 0 && filtered.length === 0 && (
        <div className="text-center py-10 bg-white rounded-2xl border border-gray-100 text-gray-400">
          <MdSearch size={36} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">User tidak ditemukan.</p>
        </div>
      )}
    </Container>
  );
}