import React, { useState, useEffect } from "react";
import { Menu, X, Plus, HelpCircle, Settings, LogOut, LayoutTemplate, List } from "lucide-react";
import { useNavigate } from "react-router";
const Sidebar = () => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const CreateNewResume = ()=>{
		navigate("/create-new-resume")
	}

	const navToSettings = ()=>{
		navigate("/settings")
	}

	const navToResumes = ()=>{
		navigate("/my-resumes");
	}

	return (
		<div className="flex h-screen font-montserrat relative top-14">
			<div
			className={`bg-white text-white h-full transition-all duration-300 ${
				open ? "w-60" : "w-16"
			}`}
			>
			<div className="flex items-center justify-between p-4 border-b border-[#333333]">
				{open && (
				<span className="text-lg text-[#333333] font-semibold flex items-center justify-center">
					UltraResume
				</span>
				)}
				<button onClick={() => setOpen(!open)} title={open ? "Close Sidebar" : "Open Sidebar"}>
				{open ? (
					<X size={24} className="cursor-pointer text-gray-800" />
				) : (
					<Menu size={24} className="cursor-pointer text-[#333333]" />
				)}
				</button>
			</div>

			{/* Sidebar Menu Items */}
			<ul className="mt-4 space-y-2">
				<li onClick={CreateNewResume} className="flex items-center px-4 py-2 text-[#333333] hover:bg-gray-100 cursor-pointer font-medium" title="Create a new resume">
					<Plus size={20} className="mr-3" />
					{open && <span>Create a new resume</span>}
				</li>

				<li onClick={navToResumes} className="flex items-center px-4 py-2 text-[#333333] hover:bg-gray-100 cursor-pointer font-medium" title="My Resumes">
					<List size={20} className="mr-3" />
					{open && <span>My Resumes</span>}
				</li>

				{/* cheqsquare */}
				<li onClick={()=> navigate("/templates")} className="flex items-center px-4 py-2 text-[#333333] hover:bg-gray-100 cursor-pointer font-medium" title="Templates">
					<LayoutTemplate size={20} className="mr-3" />
					{open && <span>Templates</span>}
				</li>

				{/* Help & Support */}
				<li onClick={()=>navigate("/help-support")} className="flex items-center px-4 py-2 text-[#333333] hover:bg-gray-100 cursor-pointer font-medium" title="Help & Support">
					<HelpCircle size={20} className="mr-3" />
					{open && <span>Help & Support</span>}
				</li>

				{/* Settings */}
				<li onClick={navToSettings} className="flex items-center px-4 py-2 text-[#333333] hover:bg-gray-100 cursor-pointer font-medium" title="Settings">
					<Settings size={20} className="mr-3" />
					{open && <span>Settings</span>}
				</li>
			</ul>
			</div>
		</div>
	);
};

export default Sidebar;