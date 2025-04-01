import React, { useState} from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from '../../../utils/FieldValidations';

const Password = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const handleChangePassword = async (data)=>{
        console.log("password: ", data);
        // try{

        // }catch(err){
        //     console.error(err);
        //     setErrMsg(err.response?.data?.message || "Unable to change Password")
        // }
    }


  return (
    <>
        <p>Password</p>
        <form onSubmit={handleSubmit(handleChangePassword)} className='mt-4'>
            <div className="relative mt-3">
                <input 
                    type="password" 
                    id="floating_outlined_1" 
                    {...register("password")}
                    // value={password}
                    // onChange={(e)=> setPassword(e.target.value)}
                    className="block px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-[#ccc] dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer w-[280px] xs:w-[312px] sm:w-[385px]" 
                    placeholder=" " />
                <label 
                    htmlFor="floating_outlined_1" 
                    className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f5f5f5] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">New Password</label>
            </div>
            <div className="relative mt-3">
                <input 
                    type="password" 
                    id="floating_outlined_2" 
                    {...register("confirmPassword", {
                        validate: (value) => value === watch("password") || "Passwords do not match"
                    })}
                    // value={confirmPassword}
                    // onChange={(e)=> setConfirmPassword(e.target.value)}
                    className="block px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-[#ccc] dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer w-[280px] xs:w-[312px] sm:w-[385px]" 
                    placeholder=" " />
                <label 
                    htmlFor="floating_outlined_2" 
                    className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f5f5f5] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Confirm Password</label>
            </div>
            <button type="submit" className='submit-btn'>change password</button>
        </form>
    </>
  )
}

export default Password