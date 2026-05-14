import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      })
      .then((response) => {
        if (response.status !== 200) {
          setError(response.data.message);
          return;
        }

        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          setError(
            err.response.data.message ||
              "Username atau password salah"
          );
        } else {
          setError("Terjadi kesalahan");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-1">
        Login
      </h2>

      <p className="text-sm text-gray-500 text-center mb-6">
        Silakan masuk ke akun Anda
      </p>

      {error && (
        <div className="bg-red-100 text-red-600 text-sm px-3 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">
            Username
          </label>

          <input
            type="text"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            placeholder="Masukkan username"
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm outline-none focus:border-blue-400"
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-sm text-gray-700 mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={dataForm.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              className="w-full border border-gray-300 px-3 py-2 rounded text-sm outline-none focus:border-blue-400 pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <MdVisibilityOff size={18} />
              ) : (
                <MdVisibility size={18} />
              )}
            </button>
          </div>

          <div className="text-right mt-2">
            <Link
              to="/forgot"
              className="text-xs text-blue-500 hover:underline"
            >
              Lupa password?
            </Link>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-sm transition"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-center text-gray-500 mt-5">
        Belum punya akun?{" "}
        <Link
          to="/register"
          className="text-blue-500 hover:underline"
        >
          Daftar
        </Link>
      </p>
    </div>
  );
}