import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';


const Sidebar = () => {
  const { token } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);



  return (
    <div className='md:min-h-screen bg-white max-md:w-full'>
      {
        token &&
        <ul className={`text-[#515151] md:block max-md:grid max-md:grid-cols-2`}>
          <NavLink to={'/admin-dashboard'} className={({ isActive }) => `flex flex-col md:flex-row text-xs md:text-sm items-center gap-3 py-3.5 pl-0.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF]' : ''}`}>
            <img className='w-4 md:w-6' src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink to={'/all-appointments'} className={({ isActive }) => `flex flex-col md:flex-row text-xs md:text-sm items-center gap-3 py-3.5 pl-0.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF]' : ''}`}>
            <img className='w-4 md:w-6' src={assets.appointment_icon} alt="" />
            <p>Appointments</p>
          </NavLink>
          <NavLink to={'/add-doctor'} className={({ isActive }) => `flex flex-col md:flex-row text-xs md:text-sm items-center gap-3 py-3.5 pl-0.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF]' : ''}`}>
            <img className='w-4 md:w-6' src={assets.add_icon} alt="" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink to={'/doctor-list'} className={({ isActive }) => `flex flex-col md:flex-row text-xs md:text-sm items-center gap-3 py-3.5 pl-0.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF]' : ''}`}>
            <img className='w-4 md:w-6' src={assets.people_icon} alt="" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      }

      {
        dToken &&
        <ul className={`text-[#515151] md:block grid grid-cols-1 border-b-4 border-b-primary`}>
          <NavLink to={'/doctor-dashboard'} className={({ isActive }) => `flex flex-col md:flex-row text-xs md:text-sm items-center gap-3 py-3.5 pl-0.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF]' : ''}`}>
            <img className='w-4 md:w-6' src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink to={'/doctor-appointments'} className={({ isActive }) => `flex flex-col md:flex-row text-xs md:text-sm items-center gap-3 py-3.5 pl-0.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF]' : ''}`}>
            <img className='w-4 md:w-6' src={assets.appointment_icon} alt="" />
            <p>Appointments</p>
          </NavLink>
          <NavLink to={'/doctor-profile'}  className={({ isActive }) => `flex flex-col md:flex-row text-xs md:text-sm items-center gap-3 py-3.5 pl-0.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF]' : ''}`}>
            <img className='w-4 md:w-6' src={assets.people_icon} alt="" />
            <p>Profile</p>
          </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar