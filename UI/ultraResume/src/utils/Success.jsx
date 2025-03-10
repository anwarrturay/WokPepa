import React from 'react'
import { useLocation } from 'react-router';
const Success = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/register' ?
      <div className='bg-[#4CAF50] flex items-center justify-center rounded-md font-Montserrat py-2 w-[280px] xs:w-[312px] sm:w-[385px]'>
          <div className='text-white font-bold'>Registration successful.</div>
      </div>
        : location.pathname === '/' ?
      <div className='bg-[#00FF94] flex flex-col items-center justify-center rounded-md font-Montserrat'>
          <div className='text-[#5DC486]'>logged In successful.</div>
      </div>
      : null
      }
    </>
  )
}

export default Success;