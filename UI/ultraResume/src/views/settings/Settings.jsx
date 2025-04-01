import React, { useState,  } from 'react';
import { PanelRightOpen } from "lucide-react"
import logo from "../../assets/ultraResume-book.png";
import { useNavigate } from 'react-router';
import Sidebar from './Sidebar';
import useToggleSidebar from './hooks/useToggleSidebar';
// import Loading from '../../utils/Loading';
import Profile from './components/Profile';
import MyDetails from './components/MyDetails'
import Password from './components/Password';
import useAuth from '../../hooks/useAuth';
const Settings = () => {

    const [activeSubSection, setActiveSubSection] = useState("my-details");
    const  toggleSidebar  = useToggleSidebar();
   
    // const { isLoading } = useAuth();
    const navigate = useNavigate();
    
    const { isOpen, activeSection } = useAuth();

    // {isLoading 
    //     ? (<Loading />) 
    return (
        <div className='relative font-montserrat font-medium'>

                {/* :( */}
                    <>
                        <div className="flex items-center justify-between p-2 w-full right-0 left-0 bg-white">
                            <button onClick={toggleSidebar} className="p-2 rounded cursor-pointer">
                                {!isOpen && <PanelRightOpen />}
                            </button>
                            <h1 className='text-lg'>Settings</h1>
                            <button onClick={()=> navigate("/user-resume-dashboard")}>
                                <img src={logo} alt="UltraResume" className='w-[30px] cursor-pointer'/>
                            </button>
                        </div>
                        {/* Sidebar */}
                        <Sidebar />

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
                                        {activeSubSection === "my-details" && (<MyDetails />)}
                                        {activeSubSection === "profile" && (<Profile />)}
                                        {activeSubSection === "password" && (<Password />)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                {/* ) */}
            {/* } */}
        </div>
    );
};

export default Settings;
