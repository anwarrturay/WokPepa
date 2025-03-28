import React, { useEffect, useState, useRef } from "react";
import logo from "../assets/ultraResume-book.png";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import toure from "../assets/Toure.png";
import { CircleUserRound, LogOut, AppWindowMac, CircleHelp, Eye, ChevronRight, X } from 'lucide-react';
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router";
const Header = () => {
    const [user, setUser] = useState();
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const tooltipRef = useRef(null);
    const profileRef = useRef(null);
    const navigate = useNavigate();
    const logout = useLogout()
  
    const url = "/users";
    const imageURL = "http://localhost:3500";
    const { auth } = useAuth();
    const userId = auth?.userId;
    const axiosPrivate = useAxiosPrivate();

    const signOut = async ()=>{
        await logout();
        navigate("/")
    }

    useEffect(() => {
        const fetchSpecificUser = async () => {
            try {
            const res = await axiosPrivate.get(`${url}/${userId}`);
            setUser(res.data);
            } catch (error) {
            console.error("Error fetching user data:", error);
            }
        };
        fetchSpecificUser();
    }, [userId]);

    // Handle clicking outside the tooltip to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
            tooltipRef.current &&
            !tooltipRef.current.contains(event.target) &&
            !profileRef.current.contains(event.target)
            ) {
            setTooltipOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const navToAccount = ()=>{
        navigate(`/account/${userId}`)
    }

    const openProfileModal = () => {
        setTooltipOpen(false); // optionally close the tooltip
        setIsProfileModalOpen(true);
    };

    const closeProfileModal = () => {
        setIsProfileModalOpen(false);
    };

    return (
        <div className="bg-white relative w-full py-2 flex justify-between">
            {/* Logo Section */}
            <div className="flex items-center ml-2">
                <img src={logo} alt="logoImage" className="w-[30px]" />
                <div className="text-lg font-montserrat font-medium ml-2">
                ultraResume
                </div>
            </div>

            {/* User profile */}
            <div className="relative flex items-center mr-4">
                <img
                src={user && `${imageURL}${user.image}`}
                alt="user-image"
                className="w-[40px] h-[40px] rounded-full cursor-pointer"
                ref={profileRef}
                onClick={() => setTooltipOpen(!tooltipOpen)}
                />

                {/* Tooltip Dropdown */}
                {tooltipOpen && (
                <div
                    ref={tooltipRef}
                    className="absolute top-[50px] right-0 bg-white shadow-lg rounded-lg p-3 w-56 z-50 font-montserrat font-medium"
                >
                        <div className="flex items-center justify-center">
                            <img src={user && `${imageURL}${user.image}`} alt="user-profile" className="w-[70px] h-[70px] rounded-full"/>
                        </div>
                        <div className="text-gray-700 font-semibold text-center m-2">{user && `${user.firstname} ${user.lastname}`}</div>
                        <div className="text-sm text-gray-500">{user?.email || "email@example.com"}</div>
                        <hr className="my-2" />
                        <button 
                            className="flex text-sm text-[#2A5D9E] w-full text-left py-1 hover:bg-gray-100 px-2 rounded mb-2 cursor-pointer"
                            onClick={openProfileModal}
                        >
                            <Eye size={20} className="mr-2"/>
                            View Profile
                        </button>
                        <button onClick={()=> navigate("/settings")} className="flex items-center text-sm w-full text-left py-1 hover:bg-gray-100 px-2 rounded mb-2 cursor-pointer">
                            <CircleUserRound size={20} className="mr-2"/>
                            Account
                            <ChevronRight size={18} />
                        </button>
                        <button onClick={()=> navigate("/settings")} className="flex items-center text-sm w-full text-left py-1 hover:bg-gray-100 px-2 rounded mb-2 cursor-pointer">
                            <AppWindowMac size={20} className="mr-2"/>
                            Preferences
                            <ChevronRight size={18} />
                        </button>
                        <button className="flex items-center text-sm w-full text-left py-1 hover:bg-gray-100 px-2 rounded mb-2 cursor-pointer">
                            <CircleHelp size={20} className="mr-2"/>
                            Help & Support
                            <ChevronRight size={18} />
                        </button>
                        <button onClick={signOut} className="flex text-sm text-red-500 w-full text-left py-1 hover:bg-gray-100 px-2 rounded mb-2 cursor-pointer">
                            <LogOut size={20} className="mr-3" />
                            Logout
                        </button>
                </div>
                )}
                {/* Profile Modal */}                
                {isProfileModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                            <button 
                                onClick={closeProfileModal} 
                                className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
                            >
                                <X size={24} />
                            </button>
                            <div className="flex flex-col items-center">
                                <img 
                                    src={user && `${imageURL}${user.image}`} 
                                    alt="full-profile" 
                                    className="w-64 h-64 rounded-full object-cover mb-4"
                                />
                                <h2 className="text-xl font-bold mb-2">{user && `${user.firstname} ${user.lastname}`}</h2>
                                <p className="text-gray-600">{user?.email || "email@example.com"}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
