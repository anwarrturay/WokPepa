import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import ultraResumeShort from "../../assets/ultraResume-book.png";
import axios from "../../api/axios";
import Success from "../../utils/Success"
import Failure from "../../utils/Failure"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from '../../utils/schemas/FieldValidations';
import CircleAlert from '../../utils/CircleAlert';
import PasswordVisibility from '../../utils/PasswordVisibility';
const Register = () => {
    const register_url = "/register";
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const { passwordToggleButton, showPassword } = PasswordVisibility();

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    })
        

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

    // arranging the height of the registration based on whether their are errors or not.
    const height = !errors.firstname && !errors.lastname && !errors.email && !errors.password && !errors.profession && !errors.image ? "h-[680px]" : "h-[1040px]"

    const marginBottom = "mb-2"

  return (
    <div className="flex items-center justify-center flex-col scroll-smooth">
        <div className='flex flex-col relative top-10 font-montserrat mb-24'>
            <div className="flex flex-col items-center justify-center">
                <img src={ultraResumeShort} alt="" className='w-[60px]'/>
            </div>
            <div className="font-bold text-xl text-center mt-3 text-[#333333]">Create an account with us</div>
            <div className={`flex items-center relative top-3 justify-center ${success ? "flex" : "hidden"}`}>
                    {success ? <Success /> : <Failure errMsg={errMsg} />}
            </div>
            <form onSubmit={handleSubmit(handleSubmitForm)} className='flex flex-col items-center mx-4 mt-8'>
                <div className="flex flex-col">
                    <input 
                        type="text"
                        {...register("firstname")}
                        autoComplete="off"
                        placeholder="Firstname"
                        className="input-field"
                    />
                    {errors.firstname &&
                        <div className={`flex items-center mb-2 marginBottom ${marginBottom}`}>
                            <CircleAlert />
                            <p className='text-start error-msg ml-2 mt-2'>{errors.firstname?.message}</p>
                        </div>
                    }
                </div>
                <div className="flex flex-col">
                    <input 
                        type="text"
                        {...register("lastname")}
                        autoComplete="off"
                        placeholder="Lastname"
                        className="input-field"
                    />
                    {errors.lastname &&

                        <div className={`flex items-center ${marginBottom}`}>
                            <CircleAlert />
                            <p className='error-msg ml-2 mt-2'>{errors.lastname?.message}</p>
                        </div>
                    }
                </div>
                <div className="flex flex-col">
                    <input 
                        type="email"
                        {...register("email")}
                        autoComplete="off"
                        placeholder="Email"
                        className="input-field"
                    />
                    {errors.email && 
                        <div className={`flex items-center ${marginBottom}`}>
                            <CircleAlert />
                            <p className='error-msg ml-2 mt-2'>{errors.email?.message}</p>
                        </div>
                    }
                </div>
                
                <div className="flex flex-col">
                    <input 
                        type="number"
                        {...register("telephone")}
                        autoComplete="off"
                        placeholder="Phone"
                        className="input-field"
                    />
                    {errors.telephone &&
                        
                        <div className={`flex items-start ${marginBottom}`}>
                            <CircleAlert />
                            <p className='error-msg w-[240px] ml-2 mt-2'>{errors.telephone?.message}</p>
                        </div>
                    }
                </div>
                
                <div className="flex flex-col">
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
                    {errors.password &&

                        <div className={`flex items-center ${marginBottom}`}>
                            <CircleAlert />
                            <p className='error-msg ml-2 mt-2'>{errors.password?.message}</p>
                        </div>
                    }
                </div>
                <div className="flex flex-col">
                    <input 
                        type="text"
                        {...register("profession")}
                        autoComplete="off"
                        placeholder="Profession"
                        className="input-field"
                    />
                    {errors.profession && 
                        <div className={`flex items-center ${marginBottom}`}>
                            <CircleAlert />
                            <p className='error-msg ml-2 mt-2'>{errors.profession?.message}</p>
                        </div>
                    }
                </div>
                <div className="flex flex-col">
                    <input 
                        type="file"
                        accept='image/*'
                        {...register("image")}
                        className="input-field"
                    />
                    { errors.image &&
                        <div className={`flex items-start ${marginBottom}`}>
                            <CircleAlert />
                            <p className='error-msg w-[200px] ml-2 mt-2'>{errors.image?.message}</p>
                        </div>
                    }
                </div>
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