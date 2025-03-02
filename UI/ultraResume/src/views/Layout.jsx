import React from 'react'
import { Outlet } from 'react-router'
import Footer from "./Footer";
import Header from "./Header";
import Dashboard from './Dashboard';
const Layout = () => {
  return (
    <section>
        <header>
            <Header />
        </header>
        <main className='grow'>
            <Dashboard />
        </main>
        <footer>
            <Footer />
        </footer>
    </section>
  )
}

export default Layout;