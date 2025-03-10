import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import ultraResumeShort from "../assets/ultraResume-book.png";
import axios from "../api/axios";
import Success from "../utils/Success"
import Failure from "../utils/Failure"
const Register = () => {
    const register_url = "/register";
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    let display = success === true ? "flex" : "hidden";
    const navigate = useNavigate('');
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        profession: '',
        image: ''
    })

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);
    

    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        console.log("image selected", {
            image: file
        });
        setFormData({ ...formData, image: file });
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const data = new FormData();
        data.append("firstname", formData.firstname);
        data.append("lastname", formData.lastname);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("password", formData.password);
        data.append("profession", formData.profession);
        data.append("image", formData.image);
        try{
            const response = await axios.post(
                register_url, 
                data,
                {

                    headers: {"Content-Type": "multipart/form-data"},
                    withCredentials: true
                }
            )
            console.log(response.data);
            console.log(response.accessToken)
            setSuccess(true);
            setFormData({
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                password: '',
                profession: '',
                image: '',
            });
            console.log("Form Submitted", {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                profession: formData.profession,
                image: formData.image
            })
            navigate("/");
        }catch(err){
            if(!err?.response){
                setErrMsg("No Server response");
            }else if(err.response?.status === 409){
                setErrMsg("A user with this name already exist");
            }else{
                setErrMsg("Registration Failed");
            }
        }
    }

    const passwordToggleButton = useMemo(() => (
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 xs:right-[14px] top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                {showPassword ? <EyeOff /> : <Eye />}
            </button>
    ), [showPassword, togglePasswordVisibility]);


  return (
    <div className="flex items-center justify-center flex-col scroll-smooth">
        <div className="flex flex-col relative top-10 bg-white drop-shadow-2xl shadow rounded-sm font-montserrat w-[315px] h-[698px] mb-24 xs:w-[350px] sm:w-[420px] md:w-[480px]">
            <div className="flex flex-col items-center justify-center">
                <img src={ultraResumeShort} alt="" className='w-[60px]'/>
            </div>
            <div className="font-bold text-xl text-center mt-3 text-[#333333]">Create an account with us</div>
            <div className={`${display} flex items-center relative top-3 justify-center`}>{success ? <Success /> : <Failure errMsg={errMsg}/>}</div>
            <form onSubmit={handleSubmit} className='flex flex-col items-center mx-4 mt-8'>
                <input 
                    type="text"
                    value={formData.firstname}
                    onChange={(e)=> setFormData({...formData, firstname: e.target.value})}
                    autoComplete="off"
                    placeholder="Firstname"
                    className="mb-2 w-[280px] border border-[#ccc] rounded-md focus:ring-2 
                    focus:ring-[#1023F0] px-2 py-2.5 outline-none xs:w-[312px] text-lg font-[480] sm:w-[385px]"
                    required
                />
                <input 
                    type="text"
                    value={formData.lastname}
                    onChange={(e)=> setFormData({...formData, lastname: e.target.value})}
                    autoComplete="off"
                    placeholder="Lastname"
                    className="mb-2 w-[280px] border border-[#ccc] rounded-md focus:ring-2 
                    focus:ring-[#1023F0] px-2 py-2.5 outline-none xs:w-[312px] text-lg font-[480] sm:w-[385px]"
                    required
                />
                <input 
                    type="email"
                    value={formData.email}
                    onChange={(e)=> setFormData({...formData, email: e.target.value})}
                    autoComplete="off"
                    placeholder="Email"
                    className="mb-2 w-[280px] border border-[#ccc] rounded-md focus:ring-2 
                    focus:ring-[#1023F0] px-2 py-2.5 outline-none xs:w-[312px] text-lg font-[480] sm:w-[385px]"
                    required
                />
                <input 
                    type="number"
                    value={formData.phone}
                    onChange={(e)=> setFormData({...formData, phone: e.target.value})}
                    autoComplete="off"
                    placeholder="Phone"
                    className="mb-2 w-[280px] border border-[#ccc] rounded-md focus:ring-2 
                    focus:ring-[#1023F0] px-2 py-2.5 outline-none xs:w-[312px] text-lg font-[480] sm:w-[385px]"
                    required
                />
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e)=> setFormData({...formData, password: e.target.value})}
                        autoComplete="off"
                        placeholder="Password"
                        className="mb-2 w-[280px] border border-[#ccc] rounded-md focus:ring-2 
                        focus:ring-[#1023F0] px-2 py-2.5 outline-none xs:w-[312px] text-lg font-[480] sm:w-[385px]"
                        required
                    />
                    {passwordToggleButton}
                </div>
                <input 
                    type="profession"
                    value={formData.profession}
                    onChange={(e)=> setFormData({...formData, profession: e.target.value})}
                    autoComplete="off"
                    placeholder="Profession"
                    className="mb-2 w-[280px] border border-[#ccc] rounded-md focus:ring-2 
                    focus:ring-[#1023F0] px-2 py-2.5 outline-none xs:w-[312px] text-lg font-[480] sm:w-[385px]"
                    required
                />
                <input 
                    type="file"
                    name='image'
                    onChange={handleFileChange}
                    className="mb-2 w-[280px] border border-[#ccc] rounded-md focus:ring-2 
                    focus:ring-[#1023F0] px-2 py-2.5 outline-none xs:w-[312px] text-lg font-[480] sm:w-[385px]"
                    required
                />
                <div className="flex items-center justify-center">
                    <button 
                        type="submit" 
                        className="bg-[#2A5D9E] mt-3 rounded-md text-white font-medium text-center py-2.5 cursor-pointer text-lg w-[280px] xs:w-[312px] sm:w-[385px]"
                    >
                        Create account
                    </button>
                </div>
                <p className='font-Montserrat ml-2 mt-2 mb-3 text-base text-center'>
                    Already have an account?{' '}
                    <span onClick={()=> navigate(-1)} className="text-[#2A5D9E] cursor-pointer font-medium">
                        Sign In
                    </span>
                </p>
            </form>
        </div>
    </div>
  )
}

export default Register;