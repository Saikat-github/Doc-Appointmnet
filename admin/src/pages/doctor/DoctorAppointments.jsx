import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const { dToken, getAppointments, appointments, completeAppointment, cancelAppointment, loader, setLoader } = useContext(DoctorContext);
  const { calculateAge, convertDateFormat } = useContext(AppContext);


  useEffect(() => {
    getAppointments();
  }, [dToken])


  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white rounded text-sm overflow-y-scroll max-h-[80vh] min-h-[60vh]'>
        <div className='hidden sm:grid grid-cols-7 px-6 py-3 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments?.reverse().map((item, idx) => (
          <div key={idx} className='grid grid-cols-2 sm:grid-cols-7 items-center text-gray-500 py-3 sm:px-6 px-2 border-b'>
            <p className='max-sm:hidden'>{idx + 1}</p>
            <p>{item.userData.name}</p>
            <p className='px-2 border border-black rounded-full text-xs w-12 text-center'>{item.payment ? "Online" : "Cash"}</p>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p className='pr-2 text-xs sm:text-sm'>{convertDateFormat(item.slotDate)}, {item.slotTime}</p>
            <p>₹{item.amount}</p>
            {item.cancelled
              ?
              <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              :
              (item.isCompleted
                ?
                <p className='text-green-600 text-xs font-medium'>Completed</p>
                :
                <div className='flex items-center gap-2 my-2 sm:my-0'>
                  <img onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} className='w-8 cursor-pointer' />
                  <img onClick={() => completeAppointment(item._id)} src={assets.tick_icon} className='w-8 cursor-pointer' />
                  {loader && <div className='w-4 h-4 border-2 border-black rounded-full animate-spin border-t-transparent '></div>}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorAppointments