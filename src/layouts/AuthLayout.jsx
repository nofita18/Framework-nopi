import { Outlet } from "react-router-dom";
import { MdLocalLaundryService } from "react-icons/md";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="bg-white w-full max-w-sm p-8 border border-gray-200 rounded-md">
        
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <MdLocalLaundryService size={28} className="text-blue-500" />

          <h1 className="text-2xl font-semibold text-gray-800">
            Bersih.in
          </h1>
        </div>

        <Outlet />

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2025 Bersih.in
        </p>
      </div>
    </div>
  );
}