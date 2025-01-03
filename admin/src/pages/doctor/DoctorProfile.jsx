import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from 'axios'



const DoctorProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const {backendUrl, dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext);


  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();



  useEffect(() => {
    // Reset form values whenever profileData changes
    if (profileData) {
      reset({
        name: profileData?.name,
        image: profileData?.image,
        address: profileData?.address,
        fees: profileData?.fees,
        available: profileData?.available,
      });
    }
  }, [profileData, reset]);



  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);



  const onsubmit = async (data) => {
    try {
      const res = await axios.post(backendUrl + '/api/doctor/update-profile', data, { headers: { dToken } });
      if (res.data.success) {
        toast.success(res.data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }



  if (!profileData || !dToken) {
    return <div className='my-20 rounded-lg py-2 text-center mt-20 text-3xl border-primary border-4 bg-primary text-gray-100 mx-auto px-2'>No Data Available</div>
  }

  return (
    <div className='mt-10 mb-20 flex flex-col gap-10 md:gap-20 md:flex-row px-4'>
      <img src={profileData?.image} className='h-48 w-48 bg-primary rounded-sm' />
      {
        !isEdit
          ?
          <div className='text-sm flex flex-col gap-4'>
            <p className='text-2xl font-semibold'>{profileData?.name.toUpperCase()}</p>
            <p className='text-xs text-gray-700'>{profileData.degree} - {profileData.speciality} - <span>{profileData.experience}</span></p>
            <div className=''>
              <p className='text-sm'>About</p>
              <p className='text-xs text-gray-700'>{profileData.name} has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.</p>
            </div>
            <p>Appointment Fees : ₹{profileData.fees}</p>
            <p>Address : {profileData.address}</p>
            <div className='flex items-center gap-1'>
              <label>Available : </label>
              <input disabled={!isEdit} type="checkbox" defaultChecked={profileData.available}/>
            </div>
            <div className='my-6'>
              <div className='w-28 cursor-pointer  text-center py-2 px-10 border border-primary rounded-full bg-primary hover:bg-opacity-90 text-white  transition-all duration-300' onClick={() => setIsEdit(true)}>Edit</div>
            </div>

          </div>
          :
          <form onSubmit={handleSubmit(onsubmit)} className='text-sm flex flex-col gap-4'>
            <input className='border border-black px-2 py-1 rounded bg-gray-100 text-2xl font-semibold' {...register("name")}/>
            <p className='text-xs text-gray-700'>{profileData.degree} - {profileData.speciality} - <span>{profileData.experience}</span></p>
            <div className=''>
              <p className='text-sm'>About</p>
              <p className='text-xs text-gray-700'>{profileData.name} has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.</p>
            </div>
            <div>
              <label htmlFor="fees">Appointment Fees : </label>
            <input id='fees' className='border border-black px-2 py-1 rounded bg-gray-100' type="text" {...register("fees")}/>
            </div>
            <div>
              <label htmlFor="address">Address : </label>
              <input id='address' className='border border-black px-2 py-1 rounded bg-gray-100' type="text" {...register("address")}/>
            </div>
            <div className='flex items-center gap-1'>
              <label>Available : </label>
              <input type="checkbox" defaultChecked={profileData.available} {...register("available")}/>
            </div>
            <div className='my-6 flex flex-col sm:flex-row gap-6'>
              <button disabled={isSubmitting} className='py-2 px-10 border border-primary rounded-full bg-primary text-white transition-all duration-300 hover:bg-opacity-90' type='submit'> {!isSubmitting ? "Save Information" : <div className='w-4 h-4 border-4 border-red-600 border-dotted rounded-full animate-spin'></div>}</button>
              <button
                disabled={isSubmitting}
                type="button"
                onClick={() => setIsEdit(false)}
                className="py-2 px-10 border border-gray-800 rounded-full bg-gray-800 text-white transition-all duration-300 hover:bg-opacity-90"
              >
                Cancel
              </button>
            </div>

          </form>
      }




    </div>
  )
}

export default DoctorProfile