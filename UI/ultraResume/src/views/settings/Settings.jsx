import React, { useState, useEffect } from 'react';
import { PanelRightOpen } from "lucide-react"
import logo from "../../assets/ultraResume-book.png";
import { useNavigate } from 'react-router';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from '../../api/axios';
import useAuth from "../../hooks/useAuth";
import Sidebar from './Sidebar';
import useToggleSidebar from './hooks/useToggleSidebar';
const Settings = () => {
    const [user, setUser] = useState({});
    const [activeSubSection, setActiveSubSection] = useState("my-details");
    const  toggleSidebar  = useToggleSidebar();

    // User details
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [telephone, setTelephone] = useState("");
    const [profession, setProfession] = useState("");
    const [profileImage, setProfileImage] = useState("")

    const url = "/users";
    const imageURL = "http://localhost:3500";
    const { auth, isOpen, activeSection } = useAuth();
    const userId = auth?.userId;
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchSpecificUser = async () => {
            try {
                const res = await axiosPrivate.get(`${url}/${userId}`);
                setUser(res.data);
            } catch (error) {
            console.error("Error fetching user data:", error);
            }
        };
        if(userId) fetchSpecificUser();
    }, [userId]);
    
    useEffect(() => {
        if (user) {
            setFirstname(user.firstname || "");
            setLastname(user.lastname || "");
            setTelephone(user.telephone || "");
            setProfession(user.profession || "");
            setProfileImage(user.image || "");
        }
    }, [user]);


    const onFirstnameChanged = e=> setFirstname(e.target.value)
    const onLastnameChanged = e=> setLastname(e.target.value)
    const onTelephoneChanged = e=> setTelephone(e.target.value)
    const onProfessionChanged = e=> setProfession(e.target.value)

    const navigate = useNavigate();

    const home = ()=>{
        navigate("/user-resume-dashboard")
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    const handleSubmitFunc = async ()=>{

        const formData = new FormData();
        formData.append("firstname", onFirstnameChanged)
        formData.append("lastname", onLastnameChanged)
        formData.append("telephone", onTelephoneChanged)
        formData.append("profession", onProfessionChanged)

        if (profileImage && profileImage[0]) {
            formData.append("image", profileImage[0]);
        }

        try{
            const response = await axios.put(
                `${url}/profile/${userId}`,
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}},
                {withCredentials: true}
            )
            console.log(response.data);
            
        }catch(err){
            console.error(err);
        }
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
                            {activeSubSection === "my-details" && (
                                <>
                                    <form onSubmit={handleSubmitFunc} action="" className='mt-4'>
                                        {/* Image section */}
                                        <div className='flex flex-col xl:flex-row items-center space-x-4 mb-7'>
                                            <img 
                                                src={user && `${imageURL}${profileImage}`} 
                                                alt="Profile" 
                                                className='w-24 h-24 rounded-full border object-cover'
                                            />
                                            <div className="flex flex-col">
                                                <div className="text-2xl font-medium m-2 text-center">{firstname} {lastname}</div>
                                                <label className='py-2.5 bg-[#2A5D9E] text-white rounded cursor-pointer text-center w-[280px] xl:w-[220px]'>
                                                    Change Image
                                                    <input 
                                                        type="file" 
                                                        accept="image/*" 
                                                        className='hidden' 
                                                        onChange={handleImageChange}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="relative mt-2">
                                            <input 
                                                type="text" 
                                                id="floating_outlined" 
                                                value={firstname}
                                                onChange={onFirstnameChanged}
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
                                                value={lastname}
                                                onChange={onLastnameChanged}
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
                                                value={telephone}
                                                onChange={onTelephoneChanged}
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
                                                value={profession}
                                                onChange={onProfessionChanged}
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
