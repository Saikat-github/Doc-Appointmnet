import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='min-h-[150vh]'>
      <div>
        <p className='text-center text-2xl text-gray-700'>ABOUT US</p>
      </div>
      <div className='flex gap-12 mt-4 flex-col md:flex-row'>
        <img className='max-w-72' src={assets.about_image} alt="" />
        <div className='text-xs sm:text-sm flex flex-col gap-6 text-gray-700 mt-2'>
          <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records</p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <h4 className='font-semibold'>Our Vision</h4>
          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>

      {/* Why choose us */}
      <div className='my-20'>
        <h1 className='text-center text-2xl my-10 text-gray-700'>WHY CHOOSE US</h1>
        <div className='grid grid-rows-3 md:grid-cols-3 text-sm text-gray-700 gap-4'>
          <div className='p-10 space-y-3 border bg-primary text-white'>
            <h1 className='font-semibold'>EFFICIENCY</h1>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle</p>
          </div>

          <div className='p-10 space-y-3 border bg-primary text-white'>
            <h1 className='font-semibold'>CONVIENCE</h1>
            <p>Access to a network of trusted healthcare professionals in your area</p>
          </div>


          <div className='p-10 space-y-3 border bg-primary text-white'>
            <h1 className='font-semibold'>PERSONALIZATION</h1>
            <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>        </div>
      </div>
    </div>
  )
}

export default About


  