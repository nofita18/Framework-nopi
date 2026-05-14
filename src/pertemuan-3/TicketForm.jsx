import { useState } from 'react';
import InputField from './components/InputField';
import SelectDropdown from './components/SelectDropdown';

export default function TicketForm() {
  // State untuk inputan
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [telepon, setTelepon] = useState('');
  const [kategori, setKategori] = useState('');
  const [jumlah, setJumlah] = useState('');
  
  // State untuk error
  const [errors, setErrors] = useState({});
  const [showResult, setShowResult] = useState(false);
  
  // Data untuk select dropdown
  const kategoriOptions = [
    { value: 'festival', label: 'Festival (Rp 150.000)', price: 150000 },
    { value: 'bronze', label: 'Bronze (Rp 250.000)', price: 250000 },
    { value: 'silver', label: 'Silver (Rp 350.000)', price: 350000 },
    { value: 'gold', label: 'Gold (Rp 450.000)', price: 450000 },
    { value: 'vip', label: 'VIP (Rp 650.000)', price: 650000 }
  ];
  
  const jumlahOptions = [
    { value: '1', label: '1 Tiket' },
    { value: '2', label: '2 Tiket' },
    { value: '3', label: '3 Tiket' },
    { value: '4', label: '4 Tiket' },
    { value: '5', label: '5 Tiket' }
  ];
  
  // Fungsi validasi
  const validateForm = () => {
    const newErrors = {};
    // Validasi Nama (required, min 3 karakter, tidak boleh angka)
    if (!nama) {
      newErrors.nama = 'Nama harus diisi';
    } else if (nama.length < 3) {
      newErrors.nama = 'Nama minimal 3 karakter';
    } else if (/\d/.test(nama)) {
      newErrors.nama = 'Nama tidak boleh mengandung angka';
    }
    
    // Validasi Email (required, format email)
    if (!email) {
      newErrors.email = 'Email harus diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Format email tidak valid (contoh: nama@domain.com)';
    }
    
    // Validasi Telepon (required, hanya angka, panjang 10-13 digit)
    if (!telepon) {
      newErrors.telepon = 'Nomor telepon harus diisi';
    } else if (!/^\d+$/.test(telepon)) {
      newErrors.telepon = 'Nomor telepon hanya boleh berisi angka';
    } else if (telepon.length < 10 || telepon.length > 13) {
      newErrors.telepon = 'Nomor telepon harus 10-13 digit';
    }
    
    // Validasi Kategori Tiket
    if (!kategori) {
      newErrors.kategori = 'Silakan pilih kategori tiket';
    }
    
    // Validasi Jumlah Tiket
    if (!jumlah) {
      newErrors.jumlah = 'Silakan pilih jumlah tiket';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle submit
  const handleSubmit = () => {
    if (validateForm()) {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  };
  
  // Hitung total harga
  const selectedKategori = kategoriOptions.find(k => k.value === kategori);
  const totalHarga = selectedKategori && jumlah ? selectedKategori.price * parseInt(jumlah): 0;
  
  // Conditional Rendering untuk tombol submit
  const isFormValid = Object.keys(errors).length === 0 && 
                      nama && email && telepon && kategori && jumlah;
  
  return (
  <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 py-10">
    
    <div className="flex flex-col items-center justify-center m-5 p-5">
      
      {/* CARD UTAMA */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-white/40">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-pink-400 to-rose-500 text-white p-6">
          <h1 className="text-3xl font-bold text-center tracking-wide">
            🎫 Pemesanan Tiket Konser 2026
          </h1>
          <p className="text-center mt-2 text-pink-100 text-sm">
            Isi data diri Anda dengan lengkap dan benar
          </p>
        </div>

        {/* FORM */}
        <div className="p-6 space-y-2">
          
          <InputField
            label="Nama Lengkap"
            type="text"
            placeholder="Masukkan nama lengkap Anda"
            value={nama}
            onChange={(e) => {
              setNama(e.target.value);
              setShowResult(false);
            }}
            error={errors.nama}
            required={true}
          />

          <InputField
            label="Email"
            type="email"
            placeholder="contoh: nama@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setShowResult(false);
            }}
            error={errors.email}
            required={true}
          />

          <InputField
            label="Nomor Telepon"
            type="tel"
            placeholder="081234567890"
            value={telepon}
            onChange={(e) => {
              setTelepon(e.target.value);
              setShowResult(false);
            }}
            error={errors.telepon}
            required={true}
          />

          <SelectDropdown
            label="Kategori Tiket"
            options={kategoriOptions}
            value={kategori}
            onChange={(e) => {
              setKategori(e.target.value);
              setShowResult(false);
            }}
            error={errors.kategori}
            required={true}
          />

          <SelectDropdown
            label="Jumlah Tiket"
            options={jumlahOptions}
            value={jumlah}
            onChange={(e) => {
              setJumlah(e.target.value);
              setShowResult(false);
            }}
            error={errors.jumlah}
            required={true}
          />

          {/* BUTTON */}
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-3 rounded-xl 
              hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105
              shadow-lg"
            >
              💳 Hitung Total Pembayaran
            </button>

            <div className="mt-4 text-center text-sm">
              {isFormValid ? (
                <p className="text-green-600 font-medium">
                  ✅ Semua data valid!
                </p>
              ) : (
                <p className="text-rose-500 font-medium">
                  ❌ Lengkapi data dulu yaa~
                </p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* HASIL */}
      {showResult && isFormValid && (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl w-full max-w-2xl mt-6 border border-white/40">
          
          <div className="p-6 border-t-4 border-pink-400">
            
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-pink-500">
                🎉 Rincian Pemesanan
              </h2>
              <p className="text-gray-500 text-sm">
                Terima kasih sudah memesan 💖
              </p>
            </div>

            <div className="bg-pink-50 rounded-xl p-4 space-y-2">
              
              <div className="flex justify-between">
                <span>Nama</span>
                <span className="font-semibold">{nama}</span>
              </div>

              <div className="flex justify-between">
                <span>Email</span>
                <span className="font-semibold">{email}</span>
              </div>

              <div className="flex justify-between">
                <span>Telepon</span>
                <span className="font-semibold">{telepon}</span>
              </div>

              <div className="flex justify-between">
                <span>Kategori</span>
                <span className="font-semibold">
                  {selectedKategori?.label}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Jumlah</span>
                <span className="font-semibold">{jumlah} tiket</span>
              </div>

              <div className="border-t border-dashed my-3"></div>

              <div className="flex justify-between text-lg font-bold text-pink-600">
                <span>Total</span>
                <span>Rp {totalHarga.toLocaleString('id-ID')}</span>
              </div>

            </div>

            <div className="mt-4 p-3 bg-pink-100 rounded-lg text-sm text-pink-700">
              📩 Detail akan dikirim ke email kamu ya~
            </div>

          </div>
        </div>
      )}
    </div>
  </div>
);
}