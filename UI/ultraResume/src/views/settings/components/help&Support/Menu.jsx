import React from 'react'
import ultraResumeLogo from "../../../../assets/ultraResume-full.png";
import { ArrowLeft } from 'lucide-react';
import useAuth from '../../../../hooks/useAuth';
import { useNavigate } from 'react-router';
const Menu = () => {
  const navigate = useNavigate();
  const { setActiveSectionHS } = useAuth();
  return (
    <>
          <header className='flex m-3 justify-between'>
            <ArrowLeft onClick={() => navigate(-1)} size={20} className='mr-3 cursor-pointer' />
            <h1 className='text-base font-medium text-center'>Help and Support</h1>
            <div></div>
          </header>

          <main className='flex flex-col items-center'>
            <div className="flex flex-col mb-10">
              <img src={ultraResumeLogo} alt="UltraResume Logo" className='w-32' />
            </div>

            <div className="flex flex-col bg-[#e4e4e4] divide-y divide-[#ccc] m-3 rounded-2xl text-sm font-medium w-xs sm:w-sm md:w-md lg:w-lg xl:w-xl 2xl:w-2xl 3xl:w-3xl">
              <div className='h-8 mx-2 my-3 cursor-pointer' onClick={() => setActiveSectionHS("helpCenter")}>
                Help Center
              </div>
              <div className='h-8 mx-2 my-3 cursor-pointer' onClick={() => setActiveSectionHS("channelReports")}>
                Channel Reports
              </div>
              <div className='h-8 mx-2 my-3 cursor-pointer' onClick={() => setActiveSectionHS("terms")}>
                Terms and Conditions
              </div>
            </div>
          </main>
    </>
  )
}

export default Menu