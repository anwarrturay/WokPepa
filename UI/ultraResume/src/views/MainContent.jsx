import React, { useState } from 'react';
import { Plus } from 'lucide-react'
import { Search } from 'lucide-react';
import { Link } from 'react-router';
const MainContent = () => {
  return (
    <section className='flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center relative'>
            <Search className='absolute left-[10px] cursor-pointer text-gray-600'/>
            <input
                type="search"
                name="q"
                id="search"
                placeholder="Search..."
                className='px-10 py-2 rounded-3xl outline-none focus:ring-2 focus:ring-blue-500 font-montserrat placeholder:font-medium bg-white cursor-pointer transition-all duration-300 w-[230px]'
            />
        </div>
        <h3 className='text-base font-medium font-montserrat relative top-5'>Create a new Resume</h3>
        <Link to={'/create-new-resume'} className="flex flex-col items-center m-10 cursor-pointer">
            <div className="w-[50mm] h-[57mm] bg-white shadow-lg border border-gray-300 flex items-center justify-center rounded-md">
                <Plus className="text-[#1023F0]" size={64} />
            </div>
            <div className="text-sm font-montserrat font-medium mt-3">
                Start a new resume
            </div>
        </Link>
    </section>
  )
}

export default MainContent