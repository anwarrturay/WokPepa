import React from 'react'
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
const Dashboard = () => {
  return (
    <>
        <div className='text-center relative top-[20px] font-bold text-3xl'>Dashboard</div>
        <Sidebar />
        <Outlet />
    </>
  )
}

export default Dashboard;