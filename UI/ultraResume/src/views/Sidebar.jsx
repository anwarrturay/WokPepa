import React, { useState } from "react";
import { Menu, X, Plus, HelpCircle, Settings, LogOut, Briefcase } from "lucide-react"; // ✅ Imported icons

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const logout = ()=>{
    navigate("/logout");
  }

  return (
    <div className="flex h-screen font-montserrat">
      {/* Sidebar */}
      <div
        className={`bg-white text-white h-full transition-all duration-300 ${
          open ? "w-60" : "w-16"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#333333]">
          {open && (
            <span className="text-lg text-[#333333] font-semibold flex items-center justify-center">
              UltraResume
            </span>
          )}
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <X size={24} className="cursor-pointer text-gray-800" />
            ) : (
              <Menu size={24} className="cursor-pointer text-[#333333]" />
            )}
          </button>
        </div>

        {/* Sidebar Menu Items */}
        <ul className="mt-4 space-y-2">
          {/* Profession */}
          <li className="flex items-center px-4 py-2 text-[#333333] hover:bg-gray-100 cursor-pointer">
            <Briefcase size={20} className="mr-3" />
            {open && <span>Profession</span>}
          </li>

          {/* Help & Support */}
          <li className="flex items-center px-4 py-2 text-[#333333] hover:bg-gray-100 cursor-pointer">
            <HelpCircle size={20} className="mr-3" />
            {open && <span>Help & Support</span>}
          </li>

          {/* Settings */}
          <li className="flex items-center px-4 py-2 text-[#333333] hover:bg-gray-100 cursor-pointer">
            <Settings size={20} className="mr-3" />
            {open && <span>Settings</span>}
          </li>

          {/* Logout */}
          <li className="flex items-center px-4 py-2 text-[#333333] hover:bg-red-100 cursor-pointer text-red-600">
            <LogOut size={20} className="mr-3" />
            {open && <span>Logout</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;