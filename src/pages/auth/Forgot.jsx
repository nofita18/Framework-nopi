import { useState } from "react";
import { Link } from "react-router-dom";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✉️</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Email Terkirim!</h2>
        <p className="text-sm text-gray-500 mb-6">
          Link reset password telah dikirim ke <strong>{email}</strong>.
        </p>
        <Link to="/login" className="text-blue-500 text-sm font-semibold hover:underline">
          ← Kembali ke halaman login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center">Lupa Password?</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Masukkan email Anda dan kami akan mengirimkan link untuk reset password.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="you@example.com" />
        </div>

        <button type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition duration-300 text-sm">
          Kirim Link Reset
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-5">
        Ingat password Anda?{" "}
        <Link to="/login" className="text-blue-500 font-semibold hover:underline">Masuk di sini</Link>
      </p>
    </div>
  );
}
