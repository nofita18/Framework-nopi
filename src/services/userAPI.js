// =====================================================
// userAPI.js — PERSIS seperti materi Pertemuan 13
// CRUD langsung ke tabel users via REST API Supabase
// =====================================================
import axios from "axios";

// ⚠️ GANTI dengan nilai dari Supabase Anda:
//   API_URL → Integration → Data API → API URL + /user
//   API_KEY → Project Settings → API Keys → Publishable Key
const API_URL = "https://rpyynknqlkntidsewcpx.supabase.co/rest/v1/user";
const API_KEY = "sb_publishable_CzDklGjqbpPzdxuPsH3pkg_ExfHlrCi";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const userAPI = {
  // Ambil semua data user (untuk halaman Admin)
  async fetchUsers() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  // Register — tambah user baru ke tabel
  async registerUser(userData) {
    const response = await axios.post(API_URL, userData, { headers });
    return response.data;
  },

  // Login — cari user berdasarkan email dan password (seperti materi)
  async loginUser(email, password) {
    const response = await axios.get(
      `${API_URL}?email=eq.${email}&password=eq.${password}`,
      { headers }
    );
    return response.data; // array berisi user jika cocok
  },

  // Delete user (untuk Admin)
  async deleteUser(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },
};
