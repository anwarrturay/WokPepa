import React, { useState } from 'react';
import { Plus } from 'lucide-react'
import { Link } from 'react-router';
const MainContent = () => {
  return (
    <section className='flex flex-col items-center justify-center relative top-[20px] text-[#333333] font-montserrat'>
        <h1 className="font-bold text-lg w-[280px] text-center">Start a new resume with Us</h1>
        <h3 className='text-sm font-medium relative top-5'>Build a new resume with us</h3>
        <div className="flex flex-col items-center justify-center xl:flex-row lg:flex-row md:flex-row">
            <Link to={'/create-new-resume'} className="flex flex-col items-center mt-10 cursor-pointer">
                <div className="w-[50mm] h-[57mm] bg-white shadow-lg border border-gray-300 flex items-center justify-center rounded-md">
                    <Plus className="text-[#2A5D9E]" size={64} />
                </div>
                <div className="text-sm font-medium mt-2">
                    New resume
                </div>
            </Link>
        </div>
    </section>
  )
}

export default MainContent