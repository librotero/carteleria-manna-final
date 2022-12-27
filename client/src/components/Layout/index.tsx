import Footer from '../Footer'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

const Layout = ({ children } : any) => {
  return (
    <>
      <main className='ml-0 lg:ml-60'>
      {children}
      </main>
    </>
  )
}

export default Layout
