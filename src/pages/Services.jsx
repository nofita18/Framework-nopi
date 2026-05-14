import { useState } from "react";
import { MdSearch, MdFilterList } from "react-icons/md";
import laundryData from "../data/laundry_services.json";

export default function Services() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const allCategories = [...new Set(laundryData.map((item) => item.category))];

  const filtered = laundryData.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Layanan Laundry</h1>
        <p className="text-sm text-gray-500 mt-1">Kelola semua layanan yang tersedia</p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
          <MdSearch className="text-gray-400 shrink-0" size={18} />
          <input type="text" placeholder="Cari layanan..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none text-gray-600 w-full" />
        </div>
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
          <MdFilterList className="text-gray-400 shrink-0" size={18} />
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-transparent text-sm outline-none text-gray-600">
            <option value="">Semua Kategori</option>
            {allCategories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
          </select>
        </div>
        <p className="text-sm text-gray-400 flex items-center px-2">{filtered.length} layanan</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((item) => (
          <div key={item.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="relative">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
              <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs font-semibold text-blue-600 px-2.5 py-1 rounded-full shadow-sm">
                {item.category}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800">{item.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5">⏱ {item.details.duration} · {item.details.unit}</p>
              <p className="text-xs text-gray-400">👤 {item.staff.name}</p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-blue-600 font-bold">Rp {item.price.toLocaleString("id-ID")}</p>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  {item.details.availability}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {item.tags.map((tag, i) => (
                  <span key={i} className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
