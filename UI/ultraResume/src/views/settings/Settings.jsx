import React, { useState, useEffect } from 'react';
import { X, PanelRightOpen, CircleUserRound, AppWindowMac, FileUser, Bell } from "lucide-react";
import logo from "../../assets/ultraResume-book.png";
import { useNavigate } from 'react-router';
const Settings = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("account");
    const [activeSubSection, setActiveSubSection] = useState("my-details");
    const [firstname, setFirstname] = useState();
    const [Lastname, setLastname] = useState();
    const [telephone, setTelephone] = useState();
    const [profession, setProfession] = useState();

    const navigate = useNavigate();
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const home = ()=>{
        navigate("/user-resume-dashboard")
    }

    return (
        <div className='relative font-montserrat font-medium'>
            <div className="flex items-center justify-between p-2 w-full right-0 left-0 bg-white">
                <button onClick={toggleSidebar} className="p-2 rounded cursor-pointer">
                    {!isOpen && <PanelRightOpen />}
                </button>
                <h1 className='text-lg'>Settings</h1>
                <button onClick={home}>
                    <img src={logo} alt="UltraResume" className='w-[30px] cursor-pointer'/>
                </button>
            </div>
            
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full bg-white text-black w-64 p-4 transition-transform transform z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex items-center justify-between">
                    <div className='flex items-center font-medium text-lg'>
                        <img src={logo} alt="UltraResume" className='w-[30px] mr-2'/>
                        UltraResume
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
                </ul>
            </div>

            {/* Content Section */}
            <div className='p-6'>
                {activeSection === "account" && (
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-lg font-semibold'>Account Settings</h2>
                        <div className='flex text-sm space-x-4 mt-4'>
                            <button 
                                className={`p-2 ${activeSubSection === "my-details" ? "border-b-2 border-black" : "text-gray-500"}`} 
                                onClick={() => setActiveSubSection("my-details")}
                            >
                                My Details
                            </button>
                            <button 
                                className={`p-2 ${activeSubSection === "profile" ? "border-b-2 border-black" : "text-gray-500"}`} 
                                onClick={() => setActiveSubSection("profile")}
                            >
                                Profile
                            </button>
                            <button 
                                className={`p-2 ${activeSubSection === "password" ? "border-b-2 border-black" : "text-gray-500"}`} 
                                onClick={() => setActiveSubSection("password")}
                            >
                                Password
                            </button>
                        </div>
                        <hr className='w-full border-1 border-gray-300'/>
                        <div className='mt-4'>
                            {activeSubSection === "my-details" && (
                                <>
                                    <p>Personal Details</p>
                                    <form action="" className='mt-4'>
                                        <div className="relative mt-2">
                                            <input 
                                                type="text" 
                                                id="floating_outlined" 
                                                className="block px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-[#ccc] dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer w-[280px] xs:w-[312px] sm:w-[385px]" 
                                                placeholder=" " 
                                            />
                                            <label 
                                                htmlFor="floating_outlined" 
                                                className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f5f5f5] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                                            >
                                                Firstname
                                            </label>
                                        </div>
                                        <div className="relative mt-2">
                                            <input 
                                                type="text" 
                                                id="floating_outlined" 
                                                className="block px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-[#ccc] dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer w-[280px] xs:w-[312px] sm:w-[385px]" 
                                                placeholder=" " 
                                            />
                                            <label 
                                                htmlFor="floating_outlined" 
                                                className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f5f5f5] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                                            >
                                                Lastname
                                            </label>
                                        </div>
                                        <div className="relative mt-2">
                                            <input 
                                                type="text" 
                                                id="floating_outlined" 
                                                className="block px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-[#ccc] dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer w-[280px] xs:w-[312px] sm:w-[385px]" 
                                                placeholder=" " 
                                            />
                                            <label 
                                                htmlFor="floating_outlined" 
                                                className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f5f5f5] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                                            >
                                                Telephone
                                            </label>
                                        </div>
                                        <div className="relative mt-2">
                                            <input 
                                                type="text" 
                                                id="floating_outlined" 
                                                className="block px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-[#ccc] dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer w-[280px] xs:w-[312px] sm:w-[385px]" 
                                                placeholder=" " 
                                            />
                                            <label 
                                                htmlFor="floating_outlined" 
                                                className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f5f5f5] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                                            >
                                                Profession
                                            </label>
                                        </div>
                                        <button type="submit" className='submit-btn'>Save changes</button>
                                    </form>
                                </>
                            )}
                            {activeSubSection === "profile" && <p>Profile Content</p>}
                            {activeSubSection === "password" && (
                                <>
                                    <p>Password</p>
                                    <form action="" className='mt-4'>
                                        <div className="relative mt-3">
                                            <input 
                                                type="text" 
                                                id="floating_outlined" 
                                                className="block px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-[#ccc] dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer w-[280px] xs:w-[312px] sm:w-[385px]" 
                                                placeholder=" " />
                                            <label 
                                                htmlFor="floating_outlined" 
                                                className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f5f5f5] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">New Password</label>
                                        </div>
                                        <div className="relative mt-3">
                                            <input 
                                                type="text" 
                                                id="floating_outlined" 
                                                className="block px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-[#ccc] dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer w-[280px] xs:w-[312px] sm:w-[385px]" 
                                                placeholder=" " />
                                            <label 
                                                htmlFor="floating_outlined" 
                                                className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f5f5f5] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Confirm Password</label>
                                        </div>
                                        <button type="submit" className='submit-btn'>change password</button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;
