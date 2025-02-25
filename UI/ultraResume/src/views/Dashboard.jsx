import React from 'react'
import { Link, Outlet } from 'react-router';
const Dashboard = () => {
  return (
    <>
        <div className='text-center relative top-[20px] font-bold text-3xl'>Dashboard</div>
        {/* <Link to={'settings'} className="flex items-center justify-center">
            <div  className='bg-blue-500 text-white p-2.5 rounded-md font-medium text-center relative top-[200px] w-[200px] mt-5'>Settings</div>
        </Link> */}
        <Outlet />
    </>
  )
}

export default Dashboard;