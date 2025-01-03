import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { useState } from 'react';
import ConfirmationModal from '../../components/ConfirmationModal';


const DoctorDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const { dashData, setDashData, getDashData, dToken, cancelAppointment, loader, completeAppointment } = useContext(DoctorContext);
  const { convertDateFormat } = useContext(AppContext);



  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);



  // Open the modal when delete button is clicked
  const openModal = (id) => {
    setId(id);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setId(null);
  };



  if (!dashData) {
    return <p className='text center mx-auto my-20 text-2xl font-medium'>Loading...</p>
  }



  return (
    <div className='py-4 px-6'>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='bg-white p-4 flex gap-2'>
          <img className='w-10' src={assets.earning_icon} alt="" />
          <p className='text-xs'><span className='text-sm font-semibold' >{dashData.earnings}</span> <br />Earnings</p>
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
          <p className='text-sm font-semibold'>Latest Appointment</p>
        </div>
        <hr className='my-2' />
        <div className='flex flex-col gap-6 py-2'>
          {dashData?.latestAppointments?.map((item, idx) => (
            <div className='flex justify-between' key={idx}>
              <div>
                <h2 className='text-sm'>{item.userData.name}</h2>
                <p className='text-xs text-gray-500 max-sm:w-1/2'>Booking On -  {convertDateFormat(item.slotDate)} {item.slotTime}</p>
              </div>
              {item.cancelled 
              ? 
              <p className='text-red-400 text-xs font-medium'>Cancelled</p> 
              : 
              (
                item.isCompleted 
                ?
                <p className='text-xs text-green-600 font-medium'>Completed</p>
                : 
                <div className='flex items-center gap-2 my-2 sm:my-0'>
                <img onClick={() => openModal(item._id)} src={assets.cancel_icon} className='w-8 cursor-pointer' />
                <img onClick={() => completeAppointment(item._id)} src={assets.tick_icon} className='w-8 cursor-pointer' />              
                <ConfirmationModal
                  isOpen={isModalOpen}
                  message="Are you sure you want to cancel this appointment?"
                  onConfirm={() => cancelAppointment(id)} // Handle confirm action
                  onCancel={closeModal} // Handle cancel action
                  loading={loader}
                />
              </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard