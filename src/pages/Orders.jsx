import { useState } from "react";
import { 
  FiSearch, FiFilter, FiPlus, FiEye, FiEdit2, FiTrash2, 
  FiChevronLeft, FiChevronRight 
} from "react-icons/fi";

const ordersData = [
  { id: "345321231", customer: "Darlene Robertson", phone: "081234567890", service: "Design", designation: "UI/UX Designer", type: "Office", status: "Permanent", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: "987890345", customer: "Floyd Miles", phone: "082345678901", service: "Development", designation: "PHP Developer", type: "Office", status: "Permanent", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: "453367122", customer: "Cody Fisher", phone: "083456789012", service: "Sales", designation: "Sales Manager", type: "Office", status: "Permanent", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: "345321231", customer: "Dianne Russell", phone: "084567890123", service: "Sales", designation: "BDM", type: "Remote", status: "Permanent", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: "453677881", customer: "Savannah Nguyen", phone: "085678901234", service: "Design", designation: "Design Lead", type: "Office", status: "Permanent", avatar: "https://i.pravatar.cc/150?u=5" },
];

export default function Orders() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-8 bg-white min-h-screen font-sans text-[#718096]">
      {/* Header / Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-sm">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#f9fafb] border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#6344f2] hover:bg-[#5235d9] text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-purple-100">
            <FiPlus size={20} />
            Add New Employee
          </button>
          <button className="flex items-center gap-2 border border-gray-200 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all">
            <FiFilter className="text-gray-600" />
            <span className="text-gray-700 font-medium">Filter</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#a0aec0] text-sm border-b border-gray-50">
                <th className="px-6 py-5 font-medium">Employee Name</th>
                <th className="px-6 py-5 font-medium">Employee ID</th>
                <th className="px-6 py-5 font-medium">Department</th>
                <th className="px-6 py-5 font-medium">Designation</th>
                <th className="px-6 py-5 font-medium">Type</th>
                <th className="px-6 py-5 font-medium">Status</th>
                <th className="px-6 py-5 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ordersData.map((emp, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={emp.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                      <span className="font-semibold text-[#2d3748]">{emp.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{emp.id}</td>
                  <td className="px-6 py-4 text-sm">{emp.service}</td>
                  <td className="px-6 py-4 text-sm">{emp.designation}</td>
                  <td className="px-6 py-4 text-sm">{emp.type}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-[#f0eaff] text-[#6344f2] text-xs font-semibold rounded-lg">
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 text-gray-400">
                      <button className="hover:text-purple-600 transition-colors"><FiEye size={18} /></button>
                      <button className="hover:text-blue-600 transition-colors"><FiEdit2 size={18} /></button>
                      <button className="hover:text-red-600 transition-colors"><FiTrash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-5 flex items-center justify-between border-t border-gray-50 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Showing</span>
            <select className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 outline-none">
              <option>10</option>
            </select>
            <FiChevronLeft className="text-gray-300 ml-2" />
          </div>
          
          <div className="text-gray-400">
            Showing 1 to 10 out of 60 records
          </div>

          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"><FiChevronLeft /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#6344f2] text-white font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">4</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"><FiChevronRight /></button>
          </div>
        </div>
      </div>
    </div>
  );
}