import React, { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { AdminContext } from './context/AdminContext'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
import { DoctorContext } from './context/DoctorContext'


const App = () => {
  const { token } = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext);


  return token || dToken ?
    (
      <div>
        <Navbar />
        <ToastContainer />
        <div className='flex flex-col md:flex-row items-start bg-[#F2F3FF]'>
          <Sidebar />
          <Outlet />
        </div>
      </div>
    )
    :
    <>
      <Login />
      <ToastContainer />
    </>

}

export default App