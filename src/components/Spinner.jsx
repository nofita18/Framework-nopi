export default function Spinner({ size = "md", label = "" }) {
  const sizeClass = { sm: "w-4 h-4", md: "w-8 h-8", lg: "w-12 h-12" };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${sizeClass[size]} border-4 border-purple-200 border-t-[#6344f2] rounded-full animate-spin`} />
      {label && <p className="text-sm text-gray-500">{label}</p>}
    </div>
  );
}
