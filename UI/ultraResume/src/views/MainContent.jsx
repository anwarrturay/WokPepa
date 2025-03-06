import React, { useState } from 'react';
import { Plus } from 'lucide-react'
import { Search } from 'lucide-react';
import { Link } from 'react-router';
const MainContent = () => {
  return (
    <section className='flex flex-col items-center justify-center relative top-[20px]'>
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
        <h3 className='text-base font-medium font-montserrat relative top-5'>Build a new resume with us</h3>
        <div className="flex flex-col items-center justify-center xl:flex-row">
            <Link to={'/create-new-resume'} className="flex flex-col items-center mt-10 cursor-pointer">
                <div className="w-[50mm] h-[57mm] bg-white shadow-lg border border-gray-300 flex items-center justify-center rounded-md">
                    <Plus className="text-[#1023F0]" size={64} />
                </div>
                <div className="text-sm font-montserrat font-medium mt-2">
                    New resume
                </div>
            </Link>
            <Link to={'/create-new-resume'} className="flex flex-col items-center m-3 cursor-pointer">
                <div className="w-[50mm] h-[57mm] bg-white shadow-lg border border-gray-300 flex items-center justify-center rounded-md font-montserrat">
                    Template 1
                </div>
            </Link>
            <Link to={'/create-new-resume'} className="flex flex-col m-3 items-center cursor-pointer">
                <div className="w-[50mm] h-[57mm] bg-white shadow-lg border border-gray-300 flex items-center justify-center rounded-md font-montserrat">
                    Template 2
                </div>
            </Link>
        </div>
    </section>
  )
}

export default MainContent