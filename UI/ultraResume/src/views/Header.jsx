import React from 'react'
import logo from "../assets/ultraResume-book.png";
import toure from "../assets/Toure.png"

const Header = () => {

  return (
    <div className='bg-white relative py-2 flex justify-between'>
      {/* Logo Section */}
      <div className="flex items-center justify-center ml-2">
            <img src={logo} alt="logoImage" className='w-[30px]'/>
            <div className="text-lg font-montserrat font-medium ml-2">ultraResume</div>
      </div>
      {/* User profile */}
      <div className="flex items-center justify-center rounded-4xl">
        <img src={toure} alt="toureImage" className='w-[40px] rounded-3xl mr-1' />
      </div>
    </div>
  )
}

export default Header