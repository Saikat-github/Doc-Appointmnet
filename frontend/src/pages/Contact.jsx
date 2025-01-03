import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='min-h-screen mb-20'>
      <h1 className='text-center text-2xl my-10 text-gray-700'>CONTACT US</h1>

      <div className='flex justify-center flex-col sm:flex-row gap-10'>
        <img className='max-w-80' src={assets.contact_image} alt="" />
        <div className='text-sm text-gray-700 my-6 space-y-6'>
          <h2 className='font-semibold'>OUR OFFICE</h2>
          <p>54709 Willms Station <br />
          Suite 350, Washington, USA</p>
          <p>Tel : (415) 555-1032 <br />
          Email : saikatservices@gmail.com</p>
          <h2 className='font-semibold'>CAREERS AT PRESCRIPTO</h2>
          <p>Learn more about our teams and job openings</p>

          <button className='py-3 px-6 border border-black hover:bg-gray-800 hover:text-white transition-all duration-300'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact