import React from 'react'
import { MoveLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <main className='flex flex-col items-center justify-center relative top-36 font-montserrat'>
      <h1 className='font-semibold text-2xl'>Forgot Password?</h1>
      <p className='text-sm text-[#7a7a7a]'>No worries we'll send you reset instructions </p>
      <form className='flex flex-col gap-2 px-5 mt-3'>
        <label htmlFor="user-email">Enter your email</label>
        <input 
          type="email" 
          className='input-field placeholder:text-sm'
          placeholder='example@gmail.com'
        />
        <button className='submit-btn'>Reset Password</button>
        <button onClick={(e)=> {
              e.preventDefault();
              navigate("/")
          }} className='flex justify-center py-2.5 rounded-md font-medium cursor-pointer'>
          <MoveLeft className='mr-3'/>
          Back to Login
        </button>
      </form>
      <div className="flex items-center justify-center mt-10">
        Want an account?
        <span
            className="text-[#2A5D9E] cursor-pointer font-medium ml-1"
            onClick={() => navigate('/register')}
        >
          Create one
        </span>
      </div>
    </main>
  )
}

export default ForgotPassword