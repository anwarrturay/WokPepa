import React from 'react'
import { Outlet } from 'react-router';

import MainContent from './MainContent';
const Dashboard = () => {
  return (
    <>
        <main className='flex items-center justify-center bg-[#F5F5F5] grow'>
            <MainContent />
        </main>
    </>
  )
}

export default Dashboard;