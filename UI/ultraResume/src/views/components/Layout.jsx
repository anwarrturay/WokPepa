import Header from './Header';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
const Layout = () => {
  return (
    <section>
        <main className='flex flex-col grow h-[100vh] bg-amber-300'>
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