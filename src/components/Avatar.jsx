const colors = [
  "bg-purple-400", "bg-blue-400", "bg-emerald-400",
  "bg-pink-400", "bg-orange-400", "bg-indigo-400",
];

export default function Avatar({ name, image, size = "md" }) {
  const sizeClass = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-lg" };
  const colorIndex = name ? name.charCodeAt(0) % colors.length : 0;

  return (
    <div className={`${sizeClass[size]} ${colors[colorIndex]} rounded-full flex items-center justify-center font-bold text-white overflow-hidden shrink-0`}>
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        name?.charAt(0).toUpperCase()
      )}
    </div>
  );
}
