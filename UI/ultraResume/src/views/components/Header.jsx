import { useEffect, useState, useRef } from "react";
import logo from "../../assets/ultraResume-book.png";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { X } from "lucide-react";
import { 
  CircleUserRound, LogOut, AppWindowMac, 
  CircleHelp, Eye, ChevronRight 
} from 'lucide-react';
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../api/axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { imageSchema } from "../../utils/schemas/imageSchema";

const Header = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const tooltipRef = useRef(null);
  const profileRef = useRef(null);

  const navigate = useNavigate();
  const logout = useLogout();
  const axiosPrivate = useAxiosPrivate();

  const { auth, user, setUser } = useAuth();
  const userId = auth?.userId;
  const { setValue, watch } = useForm({
    resolver: yupResolver(imageSchema),
    defaultValues:{
      firstname: "",
      lastname: "",
      email: "",
      image: ""
    }
  })

  // Fetch logged-in user's details
  useEffect(() => {
    const fetchSpecificUser = async () => {
      if (!userId) return;
      try {
        const res = await axiosPrivate.get(`/users/${userId}`);
        if(res.data){
          if(res.data.firstname !== watch("firstname")){
            setValue("firstname", res.data.firstname || "");
          }
          if(res.data.lastname !== watch("lastname")){
            setValue("lastname", res.data.lastname)
          }
          if(res.data.email !== watch("email")){
            setValue("email", res.data.email)
          }
          if (res.data.image !== watch("image")) {
            const imageUrl = res.data.image.startsWith("/uploads") 
              ? `${BASE_URL}${res.data.image}`
              : res.data.image;
            setValue("image", imageUrl || "");
            setPreviewImage(imageUrl || "");
          }
          setUser(res.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchSpecificUser();
  }, [userId, axiosPrivate, setUser]);

  // Close tooltip on outside click.
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

  return (
    <div className="bg-white fixed h-15 w-full py-2 flex justify-between">
      {/* Logo Section */}
      <div className="flex items-center ml-2">
        <img src={logo} alt="logo" className="w-[30px]"/>
        <div className="text-lg font-montserrat font-semibold ml-2">
          WokPepa
        </div>
      </div>
      {/* User Profile Section */}
      <div className="relative flex items-center mr-4">
        <img
          src={previewImage || (watch("image") instanceof File 
            ? URL.createObjectURL(watch("image")) 
            : watch("image"))}
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
                src={previewImage || (watch("image") instanceof File 
            ? URL.createObjectURL(watch("image")) 
            : watch("image"))}
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
              className="flex flex-col items-center rounded-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={closeProfileModal} className="bg-[#f5f5f5] p-2 rounded-3xl z-50 absolute left-2 top-2 cursor-pointer">
                  <X size={20} strokeWidth={3}/>
              </button>
              <img
                src={previewImage || (watch("image") instanceof File 
                ? URL.createObjectURL(watch("image")) 
                : watch("image"))}
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
