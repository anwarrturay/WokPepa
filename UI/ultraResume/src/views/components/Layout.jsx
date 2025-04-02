import React from 'react'
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Header from './Header';
const Layout = () => {
  return (
    <section>
        <main className='flex flex-col grow'>
          <header className='z-50'>
              <Header />
          </header>
          <div className="flex">
            <Sidebar />
            <Dashboard />
          </div>
        </main>
    </section>
  )
}

export default Layout;