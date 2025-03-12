import React, { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import ultraResumeShort from "../assets/ultraResume-book.png";
import axios from "../api/axios";
import Success from "../utils/Success"
import Failure from "../utils/Failure"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from '../utils/FieldValidations';
const Register = () => {
    const register_url = "/register";
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    })

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);
    

    const handleSubmitForm = async (data)=>{
        console.log("clicked", data) // log the data that you get from the from fields

        const formData = new FormData();
        formData.append("firstname", data.firstname);
        formData.append("lastname", data.lastname);
        formData.append("email", data.email);
        formData.append("telephone", data.telephone);
        formData.append("password", data.password);
        formData.append("profession", data.profession);

        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }

        
        try{
            const response = await axios.post(
                register_url, 
                formData,
                {
                    headers: {"Content-Type": "multipart/form-data"}
                }
            )
            console.log(response.data);
            console.log(response.data.accessToken)
            setSuccess(true);
            setErrMsg("");
            setTimeout(() => navigate("/"), 1500);
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
        <div className="flex flex-col relative top-10 bg-white drop-shadow-2xl shadow rounded-sm font-montserrat w-[315px] h-[850px] mb-24 xs:w-[350px] sm:w-[420px] md:w-[480px]">
            <div className="flex flex-col items-center justify-center">
                <img src={ultraResumeShort} alt="" className='w-[60px]'/>
            </div>
            <div className="font-bold text-xl text-center mt-3 text-[#333333]">Create an account with us</div>
            <div className={`flex items-center relative top-3 justify-center ${success ? "flex" : "hidden"}`}>
                    {success ? <Success /> : <Failure errMsg={errMsg} />}
            </div>
            <form onSubmit={handleSubmit(handleSubmitForm)} className='flex flex-col items-center mx-4 mt-8'>
                <input 
                    type="text"
                    {...register("firstname")}
                    autoComplete="off"
                    placeholder="Firstname"
                    className="input-field"
                />
                <p className='error-msg'>{errors.firstname?.message}</p>
                <input 
                    type="text"
                    {...register("lastname")}
                    autoComplete="off"
                    placeholder="Lastname"
                    className="input-field"
                />
                <p className='error-msg'>{errors.lastname?.message}</p>
                <input 
                    type="email"
                    {...register("email")}
                    autoComplete="off"
                    placeholder="Email"
                    className="input-field"
                />
                <p className='error-msg'>{errors.email?.message}</p>
                <input 
                    type="number"
                    {...register("telephone")}
                    autoComplete="off"
                    placeholder="Phone"
                    className="input-field"
                />
                <p className='error-msg'>{errors.telephone?.message}</p>
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        autoComplete="off"
                        placeholder="Password"
                        className="input-field"
                    />
                    {passwordToggleButton}
                </div>
                <p className='error-msg'>{errors.password?.message}</p>
                <input 
                    type="text"
                    {...register("profession")}
                    autoComplete="off"
                    placeholder="Profession"
                    className="input-field"
                />
                <p className='error-msg'>{errors.profession?.message}</p>
                <input 
                    type="file"
                    accept='image/*'
                    {...register("image")}
                    className="input-field"
                />
                <p className='error-msg'>{errors.image?.message}</p>
                <button 
                    type="submit" 
                    className="submit-btn"
                >
                    Create account
                </button>
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