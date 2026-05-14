import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [dataForm, setDataForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Fitur registrasi belum tersedia.");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center">Buat Akun Baru ✨</h2>
      <p className="text-sm text-gray-500 text-center mb-6">Daftarkan diri Anda sebagai admin Bersih.in</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
          <input type="text" name="name" value={dataForm.name} onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Nama lengkap Anda" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="email" value={dataForm.email} onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="you@example.com" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" name="password" value={dataForm.password} onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Minimal 8 karakter" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
          <input type="password" name="confirmPassword" value={dataForm.confirmPassword} onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Ulangi password" />
        </div>

        <button type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition duration-300 text-sm">
          Daftar
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-5">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-blue-500 font-semibold hover:underline">Masuk di sini</Link>
      </p>
    </div>
  );
}
