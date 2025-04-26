import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import ultraResumeLogo from "../../assets/ultraResume-full.png";
// import google from "../assets/google.png";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/LoginValidation';
import axios from '../../api/axios';
import Failure from '../../utils/Failure';
import Success from '../../utils/Success';
import CircleAlert from '../../utils/CircleAlert';
import Loading from '../../utils/Loading';
import useAuth from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import PasswordVisibility from '../../utils/PasswordVisibility';
const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { setAuth, persist, setPersist } = useAuth();
    const { passwordToggleButton, showPassword } = PasswordVisibility();
    const auth_url = "/auth";
    // Determine where to redirect after login; default to dashboard.
    const from = location.state?.from?.pathname || "/user-resume-dashboard";

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: yupResolver(loginSchema)
    });


    const handleSubmitForm = async (data) => {
        console.log("form submitted:", data);

        try {
        const response = await axios.post(
            auth_url,
            {
                email: data.email,
                password: data.password
            },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            }
        );

        const accessToken = response.data?.accessToken;
        const decodedToken = jwtDecode(accessToken);
        const userId = decodedToken.UserInfo.id;
        console.log(userId)
        // Set auth context with necessary user info.
        setAuth({ accessToken, email: data.email, userId });
        
        if (response.status === 200) {
            setSuccess(true);
            setErrMsg("");
            setIsLoading(true);
            setTimeout(() => {
            navigate(from, { replace: true });
            }, 1500);
        }
        } catch (err) {
            setSuccess(false);
            setIsLoading(false);
            setErrMsg('');

            setTimeout(()=>{
                if (!err?.response) {
                    setErrMsg("No Server Response");
                } else if (err.response?.status === 401) {
                    setErrMsg("Incorrect email or password");
                } else {
                    setErrMsg("Login failed, Please try again");
                }
            }, 50)
        }
    };

    const togglePersist = ()=>{
        setPersist(prev=> !prev)
    }

    useEffect(()=>{
        localStorage.setItem("persist", persist)
    }, [persist])


    return (
        <>
        {isLoading ? (
            <Loading />
        ) : (
            <div className="flex flex-col items-center justify-center scroll-smooth relative top-12">
                <img src={ultraResumeLogo} alt="Ultra Resume Logo" className="relative w-[50px] top-12" />
                <div className='flex flex-col relative top-12 font-montserrat'>
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="font-bold font-Montserrat m-2 text-lg text-[#333333] text-center">
                            Sign In with an UltraResume Account
                        </h2>
                        <div className="flex  items-center relative top-3 justify-center">
                            {success ? <Success /> : (errMsg && <Failure errMsg={errMsg}/>)}
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col items-center mx-4 mt-5">
                        <div className="flex flex-col">
                            <div className="relative flex flex-col">
                                <input
                                    type="email"
                                    {...register("email")}
                                    autoComplete='off'
                                    placeholder="Email"
                                    className="input-field"
                                />
                            </div>
                            {errors.email && (
                            <div className="flex items-center mb-3">
                                <CircleAlert />
                                <p className="flex-start error-msg ml-2 mt-3">{errors.email?.message}</p>
                            </div>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <div className="relative">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    autoComplete='off'
                                    placeholder="Password"
                                    className="input-field"
                                />
                                {watch("password") && passwordToggleButton}
                            </div>
                            {errors.password && (
                            <div className="flex items-start">
                                <CircleAlert className="mr-3" />
                                <p className="flex-start error-msg ml-2 mt-2 w-[230px] xs:w-[260px] sm:w-[300px]">
                                {errors.password?.message}
                                </p>
                            </div>
                            )}
                        </div>
                        <button type="submit" className="submit-btn">
                            Login
                        </button>
                        <div className="flex flex-col justify-start mt-2">
                            <div className="flex">
                                <input 
                                    type="checkbox" 
                                    id='persist'
                                    onChange={togglePersist}
                                    checked={persist}
                                    className='mr-2'
                                />
                                <label htmlFor="persist">Keep me signed in</label>
                            </div>
                        </div>
                    </form>
                    <div className="flex flex-col font-Montserrat mb-3 ml-3 mt-3 text-base text-center">
                        <Link to={'/forgot-password'} className='text-[#2A5D9E] font-medium'>
                                Forgot Password?
                        </Link>
                        <div className="flex items-center justify-center">
                            Want an account?{' '}
                            <span
                                className="text-[#2A5D9E] cursor-pointer font-medium"
                                onClick={() => navigate('/register')}
                            >
                                Create one
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default Auth;
