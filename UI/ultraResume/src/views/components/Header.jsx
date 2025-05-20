import { useEffect, useState, useRef } from "react";
import logo from "../../assets/ultraResume-book.png";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { 
  CircleUserRound, LogOut, AppWindowMac, 
  CircleHelp, Eye, ChevronRight 
} from 'lucide-react';
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../api/axios";

const Header = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const tooltipRef = useRef(null);
  const profileRef = useRef(null);

  const navigate = useNavigate();
  const logout = useLogout();
  const axiosPrivate = useAxiosPrivate();

  const { auth, user, setUser } = useAuth();
  const userId = auth?.userId;

  useEffect(()=>{
    console.log("User's Image: ", user?.image);
  }, [user?.image])

  // Fetch logged-in user's details
  useEffect(() => {
    const fetchSpecificUser = async () => {
      if (!userId) return;
      try {
        const res = await axiosPrivate.get(`/users/${userId}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchSpecificUser();
  }, [userId, axiosPrivate, setUser]);

  // Close tooltip on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setTooltipOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  const openProfileModal = () => {
    setTooltipOpen(false);
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const profileImage = user?.isGoogleUser ? user.image : `${BASE_URL}${user?.image}`; // expecting the user's image to be either from a google user or a manual user trying to login.

  return (
    <div className="bg-white relative w-full py-2 flex justify-between">
      {/* Logo Section */}
      <div className="flex items-center ml-2">
        <img src={logo} alt="logo" className="w-[30px]" />
        <div className="text-lg font-montserrat font-semibold ml-2">
          WokPepa
        </div>
      </div>

      {/* User Profile Section */}
      <div className="relative flex items-center mr-4">
        <img
          src={profileImage}
          alt="user-profile"
          className="w-[40px] h-[40px] rounded-full cursor-pointer object-cover"
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
              <img
                src={profileImage}
                alt="user"
                className="w-[70px] h-[70px] rounded-full object-cover"
              />
            </div>
            <div className="text-gray-700 font-semibold text-center m-2">
              {user?.firstname} {user?.lastname}
            </div>
            <div className="text-sm text-gray-500 text-center">
              {user?.email || "email@example.com"}
            </div>
            <hr className="my-2" />

            <button
              className="flex text-sm text-[#2A5D9E] w-full text-left py-1 hover:bg-gray-100 px-2 rounded mb-2"
              onClick={openProfileModal}
            >
              <Eye size={20} className="mr-2" />
              View Profile
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="flex items-center text-sm w-full text-left py-1 hover:bg-gray-100 px-2 rounded mb-2"
            >
              <CircleUserRound size={20} className="mr-2" />
              Account
              <ChevronRight size={18} />
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="flex items-center text-sm w-full text-left py-1 hover:bg-gray-100 px-2 rounded mb-2"
            >
              <AppWindowMac size={20} className="mr-2" />
              Preferences
              <ChevronRight size={18} />
            </button>

            <button
              onClick={() => navigate("/help-support")}
              className="flex items-center text-sm w-full text-left py-1 hover:bg-gray-100 px-2 rounded mb-2"
            >
              <CircleHelp size={20} className="mr-2" />
              Help & Support
              <ChevronRight size={18} />
            </button>

            <button
              onClick={signOut}
              className="flex text-sm text-red-500 w-full text-left py-1 hover:bg-gray-100 px-2 rounded mb-2"
            >
              <LogOut size={20} className="mr-3" />
              Logout
            </button>
          </div>
        )}

        {/* Profile Modal */}
        {isProfileModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={closeProfileModal}
          >
            <div
              className="flex flex-col items-center rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={profileImage}
                alt="profile-full"
                className="w-[600px] h-[600px] object-cover mb-4 rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
