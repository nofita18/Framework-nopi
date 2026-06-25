// Komponen reusable loading spinner — sesuai materi Pertemuan 13
export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="p-8 text-center text-gray-500">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6344f2] mx-auto mb-2" />
      <p className="text-sm">{text}</p>
    </div>
  );
}
