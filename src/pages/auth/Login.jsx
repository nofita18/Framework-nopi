import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdLogin } from "react-icons/md";
import { userAPI } from "../../services/userAPI";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      // Login: cari user di tabel users (PERSIS materi P13)
      const usersFound = await userAPI.loginUser(form.email, form.password);

      if (usersFound.length > 0) {
        // Login berhasil → simpan ke localStorage → redirect dashboard
        const loggedInUser = usersFound[0];
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        navigate("/", { replace: true });
      } else {
        setError("Email atau password salah.");
      }
    } catch (err) {
      setError("Terjadi kesalahan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-5 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email Address
          </label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-purple-300 transition-all">
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
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <Link to="/forgot" className="text-xs text-purple-600 hover:underline">
              Lupa Password?
            </Link>
          </div>
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-purple-300 transition-all">
            <MdLock className="text-gray-400" size={18} />
            <input
              type="password"
              name="password"
              placeholder="••••••••"
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
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#7c4dff] hover:bg-[#6a3de0] text-white font-semibold rounded-xl transition-all disabled:opacity-60 shadow-md"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Memverifikasi...
            </>
          ) : (
            <>
              <MdLogin size={18} />
              Sign In
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Belum punya akun?{" "}
        <Link to="/register" className="text-[#7c4dff] font-semibold hover:underline">
          Daftar di sini
        </Link>
      </p>
    </div>
  );
}
