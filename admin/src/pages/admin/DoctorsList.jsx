import React, { useEffect } from 'react'
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../components/ConfirmationModal';
import { useState } from 'react';




const DoctorsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const [loader, setLoader] = useState(false);
  const { doctors, getAllDoctors, token, changeAvailability, backendUrl } = useContext(AdminContext);

  useEffect(() => {
    if (token) {
      getAllDoctors();
    }
  }, [token]);



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



  const removeDoctor = async () => {
    try {
      setLoader(true); 
      if (token) {
        const { data } = await axios.post(backendUrl + "/api/admin/remove-doctor", { id }, { headers: { token } });
        if (data.success) {
          toast.success(data.message);
          getAllDoctors()
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsModalOpen(false);
      setLoader(false);
    }
  }



  return (
    <div className='px-4'>
      <h1 className='mx-6 mt-2 text-2xl font-semibold text-center'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((doctor, idx) => (
          <div key={idx} className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group'>
            <img src={doctor.image} className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' />
            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{doctor.name}</p>
              <p className='text-zinc-600 text-sm'>{doctor.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input className='cursor-pointer' onChange={() => changeAvailability(doctor._id)} type="checkbox" checked={doctor?.available} />
                <p>Available</p>
              </div>
              <button onClick={() => openModal(doctor._id)} className='text-xs text-white py-1 px-2 bg-red-600 mt-1 rounded-sm hover:bg-opacity-80 transition-all duration-300'>Remove</button>
              {/* Modal for confirmation */}
              <ConfirmationModal
                    isOpen={isModalOpen}
                    message="Are you sure you want to remove this Doctor from listing?"
                    onConfirm={removeDoctor} // Handle confirm action
                    onCancel={closeModal} // Handle cancel action
                    loading={loader}
                  />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList