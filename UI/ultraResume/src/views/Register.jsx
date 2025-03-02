import React, { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import ultraResumeShort from "../assets/ultraResume-book.png";
const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate('');
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        confirmPass: '',
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

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log("Form Submitted", {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            profession: formData.profession,
            image: formData.image
        })
        setFormData({
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            password: '',
            profession: '',
            image: '',
        });
        navigate("/"); // navigating to the user login interface 
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
        <div className="flex flex-col relative top-10 bg-white drop-shadow-2xl shadow rounded-sm font-montserrat w-[315px] h-[680px] mb-24 xs:w-[350px] sm:w-[420px] md:w-[480px]">
            <div className="flex flex-col items-center justify-center">
                <img src={ultraResumeShort} alt="" className='w-[60px]'/>
            </div>
            <div className="font-bold text-xl text-center mt-3">Create an account with us</div>
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
                        className="bg-[#1023F0] mt-3 rounded-md text-white font-medium text-center py-2.5 cursor-pointer text-lg w-[280px] xs:w-[312px] sm:w-[385px]"
                    >
                        Create account
                    </button>
                </div>
                <p className='font-Montserrat ml-2 mt-2 mb-3 text-base text-center'>
                    Already have an account?{' '}
                    <span onClick={()=> navigate(-1)} className="text-[#1023F0] cursor-pointer font-medium">
                        Sign In
                    </span>
                </p>
            </form>
        </div>
    </div>
  )
}

export default Register;