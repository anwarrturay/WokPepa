import React from 'react'
import { X } from 'lucide-react'
const Failure = ({ errMsg}) => {
  return (
    <div className='bg-[#eea7a7] flex flex-col items-center justify-center rounded-md font-Montserrat sm:w-[360px] py-2'>
        <div className='text-[#fa3a50] font-bold'><X strokeWidth={3} /> {errMsg}.</div>
    </div>
  )
}

export default Failure;
