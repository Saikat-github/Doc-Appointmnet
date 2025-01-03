import React from 'react'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'


const Footer = () => {
    const navigate = useNavigate();


    
    return (
        <div>
            <div className='flex justify-between flex-col sm:flex-row gap-4 sm:gap-0'>
            <div className='w-1/3 space-y-4'>
                <img src={assets.logo} className='w-36' />
                <p className='text-xs text-gray-700 sm:w-1/2 w-[90vw]'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, nesciunt magni aspernatur eum perspiciatis dolorem. Doloremque quo maiores illum possimus quaerat quia necessitatibus amet itaque quae eius, placeat quasi natus!
                </p>
            </div>

            <div>
                <h1 className='text-sm font-semibold mb-3'>COMPANY</h1>
                <ul className='text-gray-700 text-xs space-y-3'>
                    <li className='cursor-pointer' onClick={() => navigate("/")}>Home</li>
                    <li className='cursor-pointer' onClick={() => navigate("/about")}>About Us</li>
                    <li className='cursor-pointer' onClick={() => navigate("/contact")}>Contact Us</li>
                    <li className='cursor-pointer' onClick={() => navigate("/about")}>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <h1 className='text-sm font-semibold mb-3'>GET IN TOUCH</h1>
                <ul className='text-gray-700 text-xs space-y-3'>
                    <li>+91 1000000000</li>
                    <li>saikatservices@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr  className='my-4'/>
        <p className='my-4 text-xs text-gray-800 text-center'>Copyright 2025@ YesSir. All Rights Reserved.</p>
        </div>
    )
}

export default Footer