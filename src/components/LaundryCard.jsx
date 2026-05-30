import Card from "./Card";
import Badge from "./Badge";
import Button from "./Button";

export default function LaundryCard({ image, name, category, price, duration, availability }) {
  const availType = availability === "Tersedia" ? "success" : "danger";

  return (
    <Card className="p-0 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-44 object-cover" />
        <span className="absolute top-3 right-3">
          <Badge type="info">{category}</Badge>
        </span>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-gray-800">{name}</h3>
        <p className="text-xs text-gray-400">⏱ {duration}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-[#6344f2] font-bold text-sm">
            Rp {Number(price).toLocaleString("id-ID")}
          </p>
          <Badge type={availType}>{availability}</Badge>
        </div>
        <Button type="primary" className="w-full mt-2">Pesan Sekarang</Button>
      </div>
    </Card>
  );
}
