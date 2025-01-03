import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Navbar, ScrollToTop } from './components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppContext } from './context/AppContext'


const App = () => {
  const {getUserData} = useContext(AppContext);

  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <ToastContainer />
      <main>
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App