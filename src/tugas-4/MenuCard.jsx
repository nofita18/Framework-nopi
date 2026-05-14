import menuData from "./menu_nusantara.json";

export default function MenuCard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">
        Menu Masakan Nusantara
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
              <p className="text-sm text-gray-500">{item.category}</p>

              <p className="text-sm mt-2">📍 {item.details.origin}</p>
              <p className="text-sm">👨‍🍳 {item.chef.name}</p>
              <p className="text-orange-600 font-semibold mt-2">
                Rp {item.price}
              </p>

              <div className="mt-3">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-orange-100 text-orange-600 px-2 py-1 text-xs rounded-full mr-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}