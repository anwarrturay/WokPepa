import React, { useState } from "react";
import { Menu, X, Plus} from "lucide-react";
const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen font-montserrat">
      {/* Sidebar */}
      <div
        className={`bg-white text-white h-full transition-all duration-300 ${
          open ? "w-60" : "w-16"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {open && <span className="text-lg text-black font-semibold flex items-center justify-center">
            UltraResume
            </span>}
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={24} className="cursor-pointer text-gray-800"/> : <Menu size={24} className="cursor-pointer text-gray-800"/>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
