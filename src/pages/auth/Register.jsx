import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdPerson, MdEmail, MdLock, MdPersonAdd, MdCheckCircle } from "react-icons/md";
import { userAPI } from "../../services/userAPI";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      // Register: tambah user baru ke tabel users (PERSIS materi P13)
      await userAPI.registerUser({ ...form,
         role: "user",
        created_at: new Date().toISOString() });

      setSuccess(true);
      // Redirect ke login setelah 2 detik
      setTimeout(() => navigate("/login", { replace: true }), 2000);
    } catch (err) {
      setError("Gagal mendaftar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-4">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MdCheckCircle className="text-emerald-500" size={36} />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-1">Pendaftaran Berhasil!</h3>
        <p className="text-sm text-gray-500 mb-3">
          Akun Anda telah dibuat. Mengalihkan ke halaman login...
        </p>
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Buat Akun Baru</h2>
        <p className="text-sm text-gray-400">Daftar untuk mengakses LaundryPro</p>
      </div>

      {error && (
        <div className="mb-5 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-emerald-300 transition-all">
            <MdPerson className="text-gray-400" size={18} />
            <input
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              value={form.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="bg-transparent text-sm outline-none text-gray-700 w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-emerald-300 transition-all">
            <MdEmail className="text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="bg-transparent text-sm outline-none text-gray-700 w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-emerald-300 transition-all">
            <MdLock className="text-gray-400" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Buat password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="bg-transparent text-sm outline-none text-gray-700 w-full"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all disabled:opacity-60 shadow-md"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Mendaftarkan...
            </>
          ) : (
            <>
              <MdPersonAdd size={18} />
              Daftar Akun Baru
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-[#7c4dff] font-semibold hover:underline">
          Login di sini
        </Link>
      </p>
    </div>
  );
}
