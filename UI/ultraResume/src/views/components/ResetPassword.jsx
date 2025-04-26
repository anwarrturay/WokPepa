import React from 'react'
import PasswordVisibility from '../../utils/PasswordVisibility'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {resetPasswordSchema} from "../../utils/schemas/resetPasswordSchema"
const ResetPassword = () => {

    const { passwordToggleButton, showPassword } = PasswordVisibility();
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: yupResolver(resetPasswordSchema)
    });


  return (
    <main className='flex flex-col items-center justify-center relative top-36 font-montserrat'>
        <h1 className='font-semibold text-2xl'>Create new password</h1>
        <p className='text-sm text-[#7a7a7a] text-center'>
            Your new password must be different from previous used passwords
        </p>
        <form className='flex flex-col gap-2 px-5 mt-3 mb-10'>
            <div className="flex flex-col">
                <label htmlFor="password">password</label>
                <div className="relative">
                    <input 
                        id='password'
                        type={showPassword ? "text" : "password"} 
                        className='input-field placeholder:text-sm'
                        placeholder='123@at'
                        {...register("password")}
                    />
                    {watch("password") && passwordToggleButton}
                </div>
                <p className='text-[12px] text-[#7a7a7a] font-medium'>Must be at least 8 characters</p>
            </div>
            <div className="flex flex-col">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="relative">
                    <input 
                        id='confirmPassword'
                        type={showPassword ? "text" : "password"}
                        className='input-field placeholder:text-sm'
                        placeholder='123@'
                        {...register("confirmPassword")}
                    />
                    {watch("confirmPassword") && passwordToggleButton}
                </div>
                <p className='text-[12px] text-[#7a7a7a] font-medium'>Both passwords must match</p>
            </div>
            <button className='submit-btn'>Reset Password</button>
        </form>
    </main>
  )
}

export default ResetPassword;