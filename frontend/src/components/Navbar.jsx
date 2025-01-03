import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const {token, userData, logout} = useContext(AppContext);
    const navigate = useNavigate();






    

    return (

        <div className='flex flex-col relative'>
            <div className='flex justify-between text-sm py-4 mb-5 border-b border-b-gray-700'>
                <img onClick={() => navigate("/")} className='sm:w-44 w-20 cursor-pointer' src={assets.logo} alt="" />
                <ul className='hidden md:flex items-start gap-6 font-semibold'>
                    <NavLink to="/">
                        <li className='py-1 text-gray-600 hover:text-black'>Home</li>
                        <hr className='border-none outline-none h-0.5 bg-primary m-auto hidden' />
                    </NavLink>
                    <NavLink to="/doctors">
                        <li className='py-1 text-gray-600 hover:text-black'>All Doctors</li>
                        <hr className='border-none outline-none h-0.5 bg-primary m-auto hidden' />
                    </NavLink>
                    <NavLink to="/about">
                        <li className='py-1 text-gray-600 hover:text-black'>About Us</li>
                        <hr className='border-none outline-none h-0.5 bg-primary m-auto hidden' />
                    </NavLink>
                    <NavLink to="/contact">
                        <li className='py-1 text-gray-600 hover:text-black'>Contact</li>
                        <hr className='border-none outline-none h-0.5 bg-primary m-auto hidden' />
                    </NavLink>
                </ul>
                <div className='flex gap-4'>
                    {token && userData
                        ?
                        <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-8 rounded-full' src='/upload_area.png' alt="" />
                            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                <div className='min-w-48 rounded flex flex-col gap-4 p-4 bg-stone-100'>
                                    <Link to="/my-profile" className='cursor-pointer hover:text-black'>My Profile</Link>
                                    <Link to="/my-appointments" className='cursor-pointer hover:text-black'>My Appointments</Link>
                                    <Link onClick={logout} className='cursor-pointer hover:text-black'>Logout</Link>
                                </div>
                            </div>
                        </div>
                        :
                        <Link to="/login" className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>
                            Login
                        </Link>
                    }
                    <div className=''>
                        <img onClick={() => setShowMenu(prev => !prev)} src={showMenu ? assets.cross_icon : assets.menu_icon} className={`w-6 h-6 cursor-pointer md:hidden text-right`} />
                    </div >
                </div>
            </div>
            {
                showMenu &&
                <div className={`absolute w-1/2  right-0 top-12 md:hidden z-20 p-4 bg-gray-200 rounded-md mb-5`}>
                    <ul className='flex flex-col items-start gap-2 font-semibold'>
                        <NavLink onClick={() => setShowMenu(false)} to="/">
                            <li className='py-1 text-gray-600 hover:text-black'>Home</li>
                            <hr className='border-none outline-none h-0.5 bg-primary m-auto hidden' />
                        </NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to="/doctors">
                            <li className='py-1 text-gray-600 hover:text-black'>All Doctors</li>
                            <hr className='border-none outline-none h-0.5 bg-primary m-auto hidden' />
                        </NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to="/about">
                            <li className='py-1 text-gray-600 hover:text-black'>About Us</li>
                            <hr className='border-none outline-none h-0.5 bg-primary m-auto hidden' />
                        </NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to="/contact">
                            <li className='py-1 text-gray-600 hover:text-black'>Contact</li>
                            <hr className='border-none outline-none h-0.5 bg-primary m-auto hidden' />
                        </NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to="/login" className='bg-primary text-white px-8 py-3 rounded-full font-light'>
                            Login
                        </NavLink>
                    </ul>
                </div>
            }

        </div>
    )
}

export default Navbar