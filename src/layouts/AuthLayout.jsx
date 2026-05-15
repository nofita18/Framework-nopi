import { Outlet } from "react-router-dom";
import { MdLocalLaundryService } from "react-icons/md";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#f6f4fb] flex items-center justify-center px-6 py-10">
      
      {/* Main Wrapper */}
      <div className="w-full max-w-6xl bg-[#fcfbff] rounded-sm p-8 shadow-sm border border-[#efecf7]">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* LEFT SIDE */}
          <div className="relative bg-[#f4f1fb] rounded-[28px] p-10 min-h-[620px] overflow-hidden">
            
            {/* top decoration */}
            <div className="absolute top-5 left-5 w-72 h-10 bg-[#f0ebfa] rounded-xl"></div>

            {/* Dashboard Card */}
            <div className="relative z-10 bg-white rounded-[26px] shadow-sm p-6 mt-12 w-full max-w-[500px] mx-auto">
              
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                
                {/* Sidebar */}
                <div className="w-20">
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 rounded-full bg-[#7c4dff] flex items-center justify-center">
                      <MdLocalLaundryService
                        size={16}
                        className="text-white"
                      />
                    </div>

                    <span className="text-[13px] font-semibold text-gray-700">
                      LaundryPro
                    </span>
                  </div>

                  <div className="space-y-4">
                    {[
                      "Dashboard",
                      "Pesanan",
                      "layanan",
                      "pelanggan",
                      "setting",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`text-[11px] ${
                          i === 0
                            ? "text-[#7c4dff] font-semibold"
                            : "text-gray-400"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main */}
                <div className="flex-1 pl-6">
                  
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-[18px] font-bold text-gray-800">
                        Hello Robert 👋
                      </h2>

                      <p className="text-[11px] text-gray-400">
                        Good Morning
                      </p>
                    </div>

                    <div className="w-7 h-7 rounded-full border border-gray-200"></div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      ["560", "Total Cucian"],
                      ["1050", "Pesanan Masuk"],
                      ["470", "Sudah Selesai"],
                      ["250", "Total Pendapatan"],
                    ].map(([num, label], i) => (
                      <div
                        key={i}
                        className="border border-[#f0edf8] rounded-xl p-4"
                      >
                        <p className="text-[10px] text-gray-400 mb-1">
                          {label}
                        </p>

                        <h3 className="text-[22px] font-bold text-gray-800">
                          {num}
                        </h3>
                      </div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-[12px] font-semibold text-gray-700">
                        Laundry Overview
                      </h4>

                      <span className="text-[10px] text-gray-400">
                        Today
                      </span>
                    </div>

                    <div className="flex items-end justify-between h-44 gap-4">
                      {[85, 70, 95, 60, 90, 80].map((height, i) => (
                        <div
                          key={i}
                          className="flex flex-col justify-end items-center flex-1"
                        >
                          <div className="w-3 rounded-full bg-gradient-to-t from-[#7c4dff] via-[#9c6bff] to-[#ff6b81]">
                            <div style={{ height: `${height}px` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* bottom decoration */}
            <div className="absolute bottom-6 left-6 right-6 h-24 bg-[#f0ebfa] rounded-[24px]"></div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-center">
            
            <div className="w-full max-w-md border-2 border-[#3b82f6] bg-white p-8">
              
              {/* Logo */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-[#7c4dff] flex items-center justify-center">
                  <MdLocalLaundryService
                    size={20}
                    className="text-white"
                  />
                </div>

                <h1 className="text-3xl font-medium text-gray-800">
                  LaundryPro
                </h1>
              </div>

              {/* Welcome */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome 👋
                </h2>

                <p className="text-sm text-gray-400">
                  Please login here
                </p>
              </div>

              {/* FORM */}
              <Outlet />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 