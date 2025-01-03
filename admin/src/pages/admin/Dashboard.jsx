import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { token, dashData, getDashData, cancelAppointment } = useContext(AdminContext);
  const { convertDateFormat } = useContext(AppContext);



  useEffect(() => {
    if (token) {
      getDashData();
    }
  }, [])



  if (!dashData) {
    return (<p className='text-center mx-auto my-20 p-4 border-2 border-gray-700 text-xl font-semibold rounded-lg text-sky-700'>No Data Found</p>)
  }

  return (
    <div className='py-4 px-6'>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='bg-white p-4 flex gap-2'>
          <img className='w-10' src={assets.doctor_icon} alt="" />
          <p className='text-xs'><span className='text-sm font-semibold' >{dashData.doctors}</span> <br />Doctors</p>
        </div>
        <div className='bg-white p-4 flex gap-2'>
          <img className='w-10' src={assets.appointments_icon} alt="" />
          <p className='text-xs'><span className='text-sm font-semibold' >{dashData.appointments}</span> <br />Appointments</p>
        </div>
        <div className='bg-white p-4 flex gap-2'>
          <img className='w-10' src={assets.patients_icon} alt="" />
          <p className='text-xs'><span className='text-sm font-semibold' >{dashData.patients}</span> <br />Patients</p>
        </div>
      </div>


      <div className='bg-white p-4 my-4'>
        <div className='flex items-center gap-4'>
          <img src={assets.appointments_icon} className='w-10' alt="" />
          <p className='text-sm font-semibold'>Latest Appointments</p>
        </div>
        <hr className='my-2' />
        <div className='flex flex-col gap-6 py-2'>
          {dashData?.latestAppointments.map((item, idx) => (
            <div className='flex justify-between' key={idx}>
              <div>
                <h2 className='text-sm'>{item.docData.name}</h2>
                <p className='text-xs text-gray-500'>Booking On -  {convertDateFormat(item.slotDate)} {item.slotTime}</p>
              </div>
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
    </div>
  )
}

export default Dashboard