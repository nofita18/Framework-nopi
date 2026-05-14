import menuData from "./menu_nusantara.json";
    
export default function MenuTable() {
  return (
    <div className="p-6 bg-white">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Data Menu Admin
      </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Nama</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Harga</th>
              <th className="p-3">Asal</th>
              <th className="p-3">Chef</th>
              <th className="p-3">Level Rasa</th>
            </tr>
          </thead>

          <tbody>
            {menuData.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-100 text-center">
                <td className="p-3">{item.id}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">Rp {item.price}</td>
                <td className="p-3">{item.details.origin}</td>
                <td className="p-3">{item.chef.name}</td>
                <td className="p-3">{item.details.spiceLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
