import { useState } from "react";
import menuData from "./menu_nusantara.json";

export default function MenuSearchFilter() {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedCategory: "",
    selectedTag: "",
  });

  const [tableSearch, setTableSearch] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const _searchTerm = dataForm.searchTerm.toLowerCase();

  const filteredMenu = menuData.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(_searchTerm) ||
      item.category.toLowerCase().includes(_searchTerm);

    const matchCategory = dataForm.selectedCategory
      ? item.category === dataForm.selectedCategory
      : true;

    const matchTag = dataForm.selectedTag
      ? item.tags.includes(dataForm.selectedTag)
      : true;

    return matchSearch && matchCategory && matchTag;
  });

  const allCategories = [
    ...new Set(menuData.map((item) => item.category)),
  ];
  const allTags = [
    ...new Set(menuData.flatMap((item) => item.tags)),
  ];

  const _tableSearch = tableSearch.toLowerCase();

  const filteredTable = menuData.filter((item) => {
    return (
      item.name.toLowerCase().includes(_tableSearch) ||
      item.category.toLowerCase().includes(_tableSearch) ||
      item.details.origin.toLowerCase().includes(_tableSearch)
    );
  });

  return (
    <div className="p-6 space-y-10 min-h-screen bg-gradient-to-br from-[#f7f1e3] via-[#e7d3b0] to-[#c8a97e]">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-4xl font-bold text-center text-[#5a3e2b]">
          🍛 Menu Nusantara
        </h1>
        <p className="text-center text-[#6b4f3a] mt-2">
          Jelajahi cita rasa kuliner tradisional Indonesia
        </p>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="bg-white/70 backdrop-blur p-4 rounded-2xl shadow-md border border-[#e6d5b8]">

        <input
          type="text"
          name="searchTerm"
          placeholder="Cari menu..."
          value={dataForm.searchTerm}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border border-[#d2b48c] shadow-sm focus:ring-2 focus:ring-[#a67c52] outline-none mb-3"
        />

        <select
          name="selectedCategory"
          value={dataForm.selectedCategory}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border border-[#d2b48c] shadow-sm"
        >
          <option value="">Semua Kategori</option>
          {allCategories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          name="selectedTag"
          value={dataForm.selectedTag}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border border-[#d2b48c] shadow-sm mt-3"
        >
          <option value="">Semua Tag</option>
          {allTags.map((tag, i) => (
            <option key={i} value={tag}>
              {tag}
            </option>
          ))}
        </select>

      </div>

      {/* ================= GUEST VIEW ================= */}
      <div>
        <h2 className="text-xl font-bold text-[#5a3e2b] mb-4">
          👤 Guest View
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className="bg-white/90 backdrop-blur rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-[#e6d5b8]"
            >
              <img
                src={item.image}
                className="h-40 w-full object-cover"
              />

              <div className="p-4 text-[#4b3621]">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm">{item.category}</p>
                <p className="text-sm">📍 {item.details.origin}</p>
                <p className="text-sm">👨‍🍳 {item.chef.name}</p>

                <p className="text-[#8b5e3c] font-bold mt-2">
                  Rp {item.price}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* ================= ADMIN VIEW ================= */}
      <div className="bg-white/70 backdrop-blur p-4 rounded-2xl shadow-md border border-[#e6d5b8]">

        <h2 className="text-xl font-bold text-[#5a3e2b] mb-3">
          🧑‍💼 Admin View
        </h2>

        <input
          type="text"
          placeholder="Search data tabel..."
          value={tableSearch}
          onChange={(e) => setTableSearch(e.target.value)}
          className="w-full p-3 rounded-xl border border-[#d2b48c] shadow-sm mb-4"
        />

        <div className="overflow-x-auto">

          <table className="w-full bg-white rounded-xl overflow-hidden shadow-md border border-[#e6d5b8]">

            <thead className="bg-[#a67c52] text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Nama</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Asal</th>
                <th className="p-3">Harga</th>
              </tr>
            </thead>

            <tbody>
              {filteredTable.map((item) => (
                <tr
                  key={item.id}
                  className="text-center hover:bg-[#f3e5c7] transition"
                >
                  <td className="p-3 border-t border-[#ead8b5]">
                    {item.id}
                  </td>
                  <td className="p-3 border-t border-[#ead8b5]">
                    {item.name}
                  </td>
                  <td className="p-3 border-t border-[#ead8b5]">
                    {item.category}
                  </td>
                  <td className="p-3 border-t border-[#ead8b5]">
                    {item.details.origin}
                  </td>
                  <td className="p-3 border-t border-[#ead8b5]">
                    Rp {item.price}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}