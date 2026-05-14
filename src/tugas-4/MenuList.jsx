import menuData from "./menu.json";

export default function MenuList() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

      {menuData.map((item) => (
        <div key={item.id} className="bg-white shadow rounded-xl p-4">

          <img src={item.image} className="w-full h-40 object-cover rounded-lg"/>

          <h2 className="text-pink-600 font-bold mt-2">
            {item.name}
          </h2>

          <p className="text-gray-500 text-sm">
            {item.description}
          </p>

          <p className="text-pink-500 font-semibold mt-2">
            Rp {item.price}
          </p>

        </div>
      ))}

    </div>
  );
}