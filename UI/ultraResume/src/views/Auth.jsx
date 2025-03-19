import React, { useState, useCallback, useMemo, useContext } from 'react';
import { useNavigate } from 'react-router';
import { EyeOff, Eye} from "lucide-react";
import ultraResumeLogo from "../assets/ultraResume-full.png";
// import google from "../assets/google.png";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../utils/LoginValidation';
import axios from '../api/axios';
import Failure  from '../utils/Failure';
import Success from '../utils/Success';
import CircleAlert from '../utils/CircleAlert';
import Loading from '../utils/Loading';
import { DataContext } from '../context/DataContext';
import { jwtDecode } from 'jwt-decode'
const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const { login, setUser } = useContext(DataContext);
    const auth_url = "/auth"
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(loginSchema)
    })
    // Use useCallback to prevent unnecessary re-renders
    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    const handleSubmitForm = async (data) => {
        console.log("form submitted:", data);

        try{
            const response = await axios.post(
                auth_url, 
                {
                    email: data.email,
                    password: data.password
                },
                {headers: {"Content-Type": "application/json"}}
            );

            console.log(response.data);
            if(response.status === 200){
                const { accessToken } = response.data;
                const decodedToken = jwtDecode(accessToken); // for decoding the accessToken.
                console.log(decodedToken);
                const userId = decodedToken.UserInfo.id
                login(accessToken, userId);
                setSuccess(true);
                setErrMsg("");
                setIsLoading(true)
                setTimeout(()=> navigate("/user-resume-dashboard"), 1500);
            }
        }catch(err){
            setSuccess(false);
            setIsLoading(false)
            if(!err?.response){
                setErrMsg("No Server response");
            }else if(err.response?.status === 401){
                setErrMsg("Incorrect email or password")
            }
            else{
                setErrMsg("Logged In failed, Please try again");
            }
        }
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

    const height = !errors.email && !errors.password ? "h-[370px]" : "h-[460px]";

    return (
        <>
            {isLoading ?
                <Loading />
                :
                <div className="flex flex-col items-center justify-center scroll-smooth">
                    <img src={ultraResumeLogo} alt="" className='relative w-[120px]'/>
                    <div className={`flex flex-col relative top-16 bg-white drop-shadow-2xl shadow rounded-sm font-montserrat w-[315px] ${height} mb-24 xs:w-[350px] sm:w-[420px]`}>
                        <div className="flex flex-col items-center justify-center">
                            {/* <img src={ultraResumeshort} alt="" className='w-[40px]'/> */}
                            <h2 className="font-bold font-Montserrat m-3 text-3xl text-[#333333]">Login</h2>
                            <div className="flex items-center relative top-3 justify-center">
                                {success ? <Success /> : errMsg && <Failure errMsg={errMsg} />}
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col items-center mx-4 mt-8">
                            <div className="flex flex-col">
                                <div className="relative flex flex-col">
                                    <input 
                                        type="email"
                                        {...register("email")}
                                        autoComplete="off"
                                        placeholder="Email"
                                        className="input-field"
                                    />
                                </div>
                                { errors.email && 
                                    <div className="flex items-center mb-3">
                                        <CircleAlert />
                                        <p className="flex-start error-msg ml-2 mt-3">{errors.email?.message}</p>
                                    </div>
                                }
                            </div>
                            <div className="flex flex-col">
                                <div className="relative ">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        {...register("password")}
                                        autoComplete="off"
                                        placeholder="Password"
                                        className="input-field"
                                    />
                                    {passwordToggleButton}
                                </div>
                                {errors.password && 
                                    <div className="flex items-start">
                                        <CircleAlert className="mr-3"/>
                                        <p className="flex-start error-msg ml-2 mt-2 w-[230px] xs:w-[260px] sm:w-[300px]">{errors.password?.message}</p>
                                    </div>
                                }
                            </div>
                            <button 
                                type="submit" 
                                className="submit-btn"
                            >
                                Login
                            </button>
                        </form>
                        <p className="font-Montserrat mb-3 ml-3 mt-3 text-base text-center">
                            Do not have an account?{' '}
                            <span className="text-[#2A5D9E] cursor-pointer font-medium" onClick={() => navigate('/register')}>
                                Create one
                            </span>
                        </p>
                        {/* <div className="text-center text-2xl text-[#333333] font-medium mb-1">Or</div> */}
                        {/* <div className="flex items-center justify-center">
                            <button className="py-1 rounded-md border border-[#ccc] text-base text-[#333333] flex items-center justify-center w-[280px]">
                                <img src={google} alt="" className='w-[40px] mr-2'/>
                                Continue with google
                            </button>
                        </div> */}
                    </div>
                </div>
            }
        </>
        
    );
};

export default Auth;
