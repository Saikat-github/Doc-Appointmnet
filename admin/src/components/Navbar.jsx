import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets';
import {useNavigate} from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {
    const { token, setToken } = useContext(AdminContext);
    const { dToken, setDToken } = useContext(DoctorContext)

    const navigate = useNavigate()
    const logout = () => {
        navigate('/');
        token && setToken('')
        token && localStorage.removeItem('token');
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken');
    }

    return (
        <div className='flex items-center justify-between px-4 sm:px-10 py-3 bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
                <p className='border px-2 py-0.5 rounded-full border-gray-500 text-gray-600'>{token ? "Admin" : "Doctor"}</p>
            </div>
            <button className='bg-primary text-white text-sm px-10 py-2 rounded-full' onClick={logout}>Logout</button>
        </div>

    )
}

export default Navbar