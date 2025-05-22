import React, {useState} from 'react'
import { X,  CircleUserRound, AppWindowMac, FileUser, Bell, Contact } from "lucide-react";
import logo from "../../../assets/ultraResume-book.png";
import useToggleSidebar from "../hooks/useToggleSidebar"
import useAuth from '../../../hooks/useAuth';
const Sidebar = () => {
    const { activeSection, setActiveSection, isOpen} = useAuth();
    const toggleSidebar  = useToggleSidebar();
       
  return (
        <div className={`fixed top-0 left-0 h-full bg-white text-black w-64 p-4 transition-transform transform z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between">
            <div className='flex items-center font-medium text-lg'>
                <img src={logo} alt="WokPepa" className='w-[30px] mr-2'/>
                WokPepa
            </div>
            <button onClick={toggleSidebar} className="text-black cursor-pointer bg-gray-100 rounded p-1">
                <X />
            </button>
        </div>
        <hr className='py-2 mt-2 text-gray-400'/>
        
        <ul className='mt-3'>
            <li 
                className={`flex p-2 cursor-pointer ${activeSection === "account" ? "bg-gray-200 rounded" : "hover:bg-gray-200 hover:rounded"}`} 
                onClick={() => setActiveSection("account")}
            >
                <CircleUserRound size={20} className='mr-2'/>
                Account
            </li>
            <li 
                className={`flex p-2 cursor-pointer ${activeSection === "resume" ? "bg-gray-200 rounded" : "hover:bg-gray-200 hover:rounded"}`} 
                onClick={() => setActiveSection("resume")}
            >
                <AppWindowMac size={20} className="mr-2"/>
                Resume Preferences
            </li>
            <li 
                className={`flex p-2 cursor-pointer ${activeSection === "manage-resumes" ? "bg-gray-200 rounded" : "hover:bg-gray-200 hover:rounded"}`} 
                onClick={() => setActiveSection("manage-resumes")}
            >
                <FileUser size={20} className='mr-2'/>
                Manage Resumes
            </li>
            <li 
                className={`flex p-2 cursor-pointer ${activeSection === "notifications" ? "bg-gray-200 rounded" : "hover:bg-gray-200 hover:rounded"}`} 
                onClick={() => setActiveSection("notifications")}
            >
                <Bell size={20} className='mr-2'/>
                Notification Settings
            </li>
            <li 
                className={`flex p-2 cursor-pointer ${activeSection === "contact-us" ? "bg-gray-200 rounded" : "hover:bg-gray-200 hover:rounded"}`} 
                onClick={() => setActiveSection("contact-us")}
            >
                <Contact size={20} className='mr-2'/>
                Contact Us
            </li>
        </ul>
    </div>
  )
}

export default Sidebar