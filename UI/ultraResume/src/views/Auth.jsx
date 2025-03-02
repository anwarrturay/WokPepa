import React, { useState, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router'; // Fixed import
import { EyeOff, Eye } from "lucide-react";
import ultraResumeLogo from "../assets/ultraResume-full.png";
import google from "../assets/google.png";
const Auth = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Use useCallback to prevent unnecessary re-renders
    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", {
            email: emailRef.current.value,
            password: passwordRef.current.value
        });
        e.target.reset();
        navigate("/user-resume-dashboard")
    };

    // Memoize password toggle button so it only renders when needed
    const passwordToggleButton = useMemo(() => (
        <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 xs:right-[14px] sm:right-[14px] top-3 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
        >
            {showPassword ? <EyeOff /> : <Eye />}
        </button>
    ), [showPassword, togglePasswordVisibility]);

    return (
        <div className="flex flex-col items-center justify-center scroll-smooth">
            <img src={ultraResumeLogo} alt="" className='relative w-[120px]'/>
            <div className="flex flex-col relative top-16 bg-white drop-shadow-2xl shadow rounded-sm font-montserrat w-[315px] h-[420px] mb-24 xs:w-[350px] sm:w-[420px]">
                <div className="flex items-center justify-center">
                    {/* <img src={ultraResumeshort} alt="" className='w-[40px]'/> */}
                    <h2 className="font-bold font-Montserrat m-3 text-3xl">Login</h2>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col items-center mx-4 mt-8">
                    <div className="relative ">
                        <input 
                            type="text"
                            ref={emailRef}
                            autoComplete="off"
                            placeholder="Email"
                            className="mb-2 w-[280px] border border-[#ccc] rounded-md focus:ring-2 
                            focus:ring-[#1023F0] px-2 py-2.5 outline-none xs:w-[312px] sm:w-[385px] text-lg font-[480]"
                            required
                        />
                    </div>
                    <div className="relative ">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            ref={passwordRef}
                            autoComplete="off"
                            placeholder="Password"
                            className="mb-2 w-[280px] border border-[#ccc] outline-none rounded-md focus:ring-2 focus:ring-[#1023F0] px-2 py-2.5 xs:w-[312px] sm:w-[385px] text-lg font-[480]"
                            required
                        />
                        {passwordToggleButton}
                    </div>
                    <div className="flex items-center justify-center">
                        <button 
                            type="submit" 
                            className="bg-[#1023F0] mt-3 rounded-md text-white font-medium text-center py-2.5 w-[280px] xs:w-[312px] sm:w-[385px] text-xl cursor-pointer"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <p className="font-Montserrat mb-3 ml-3 mt-3 text-base text-center">
                    Do not have an account?{' '}
                    <span className="text-[#1023F0] cursor-pointer font-medium" onClick={() => navigate('/register')}>
                        Create one
                    </span>
                </p>
                <div className="text-center text-2xl text-[#c4c4c4] font-medium mb-1">Or</div>
                <div className="flex items-center justify-center">
                    <button className="py-1 rounded-md border border-[#ccc] text-base flex items-center justify-center w-[310px]">
                        <img src={google} alt="" className='w-[40px] mr-2'/>
                        Continue with google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;