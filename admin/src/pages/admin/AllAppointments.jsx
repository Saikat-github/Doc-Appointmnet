import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AllAppointments = () => {
  const { appointments, token,
    getAllAppointments } = useContext(AdminContext);
  const { calculateAge, convertDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (token) {
      getAllAppointments()
    }
  }, []);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-2xl font-medium text-center'>All Appointments</p>

      <div className='bg-white rounded text-sm overflow-y-scroll max-h-[80vh] min-h-[60vh]'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr] grid-flow-col px-6 py-3 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Status</p>
        </div>

        {appointments?.map((item, idx) => (
          <div key={idx} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr] grid-flow-col items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>
            <p className='max-sm:hidden'>{idx + 1}</p>
            <p>{item.userData.name}</p>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{convertDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div>
              <img src={item.docData.image} className='w-8 rounded-full bg-gray-200' />
              <p>{item.docData.name}</p>
            </div>
            <p>₹{item.amount}</p>
            {item.cancelled 
              ?
               <p className='text-red-600 font-medium text-xs'>Cancelled</p>
              :
              (item.isCompleted ? <p className='text-primary font-medium text-xs'>Completed</p> : <p className='text-primary font-medium text-xs'>Not Completed</p> ) 
              }
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments