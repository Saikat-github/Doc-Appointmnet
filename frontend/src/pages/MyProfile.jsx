import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useForm } from 'react-hook-form'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'


const MyProfile = () => {
  const { userData, getUserData, token, backendUrl, logout } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();



  useEffect(() => {
    // Reset form values whenever userData changes
    if (userData) {
      reset({
        name: userData?.name,
        image: userData?.image,
        phone: userData?.phone,
        address: userData?.address,
        gender: userData?.gender,
        dob: userData?.dob,
      });
    }
  }, [userData, reset]);



  const onsubmit = async (data) => {
    try {
      const res = await axios.post(backendUrl + '/api/user/updateuser', data, { headers: { token } });
      if (res.data.success) {
        toast.success(res.data.message);
        await getUserData();
        setIsEdit(false);
      } else {
        logout(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }



  if (!userData || !token) {
    return <div className='my-20 rounded-lg py-2 text-center mt-20 text-3xl border-primary border-4 bg-primary text-gray-100'>No Data Available</div>
  }


  
  return (
    <div className='mt-10 mb-20 flex flex-col gap-10 md:gap-20 md:flex-row'>
      <img src='/upload_area.png' className='h-48 w-48' />
      {
        !isEdit
          ?
          <div>
            <p className='text-xl font-semibold mb-4'>{userData?.name.toUpperCase()}</p>
            <hr />
            <div className='flex flex-col gap-4 text-gray-700 text-xs sm:text-sm'>
              <div>
                <p className='my-4'>CONTACT INFORMATION</p>
                <div className='flex flex-col gap-4'>
                  <div className='flex'>
                    <p className='w-20 sm:w-32'>Email : </p>
                    <p className='text-primary'>{userData?.email}</p>
                  </div>
                  <div className='flex'>
                    <p className='w-20 sm:w-32'>Phone : </p>
                    <p className='text-primary'>{userData?.phone}</p>
                  </div>
                  <div className='flex'>
                    <p className='w-20 sm:w-32'>Address : </p>
                    <p>
                      {userData?.address}
                    </p>
                  </div>
                </div>
              </div>


              <div className='text-gray-700 text-sm'>
                <p className='my-4'>BASIC INFORMATION</p>
                <div className='space-y-2'>
                  <div className='flex'>
                    <p className='w-20 sm:w-32'>Gender : </p>
                    <p className='w-20 sm:w-32'>{userData?.gender}</p>
                  </div>
                  <div className='flex'>
                    <p className='w-20 sm:w-32'>BirthDay : </p>
                    <p className='w-20 sm:w-32'>{userData?.dob}</p>
                  </div>
                </div>
              </div>

              <div className='my-6'>
                <div className='w-28 cursor-pointer  text-center py-2 px-10 border border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300' onClick={() => setIsEdit(true)}>Edit</div>
              </div>
            </div>

          </div>
          :
          <form onSubmit={handleSubmit(onsubmit)}>
            <input {...register("name")} className='border-gray-400 border-2 py-1 px-2 rounded-md my-4' type="text" />
            <hr />
            <div className='flex flex-col gap-4 text-gray-700 text-xs sm:text-sm'>
              <div>
                <p className='my-4'>CONTACT INFORMATION</p>
                <div className='flex flex-col gap-4'>
                  <div className='flex'>
                    <p className='w-20 sm:w-32'>Email : </p>
                    <p className='text-primary'>{userData?.email}</p>
                  </div>
                  <div className='flex'>
                    <p className='w-20 sm:w-32'>Phone : </p>
                    <input {...register("phone")} className='border-gray-400 border-2 py-1 px-2 rounded-md' type="text" />
                  </div>
                  <div className='flex'>
                    <p className='w-20 sm:w-32'>Address : </p>
                    <p className='space-y-2'>
                      <input {...register("address")} className='border-gray-400 border-2 py-1 px-2 rounded-md' type="text" />
                    </p>
                  </div>
                </div>
              </div>


              <div className='text-gray-700 text-sm'>
                <p className='my-4'>BASIC INFORMATION</p>
                <div className='space-y-2'>
                  <div className='flex'>
                    <p className='w-20 sm:w-32'>Gender : </p>
                    <select {...register("gender")} className='border-gray-400 border-2 py-1 px-2 rounded-md'>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Prefer Not to Answer">Prefer Not to Answer</option>
                    </select>
                  </div>
                  <div className='flex'>
                    <p className='w-20 sm:w-32'>BirthDay : </p>
                    <input {...register("dob")} className='border-gray-400 border-2 py-1 px-2 rounded-md' type="date" />
                  </div>
                </div>
              </div>


              <div className='my-6 flex flex-col sm:flex-row gap-6'>
                <button disabled={isSubmitting} className='py-2 px-10 border border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300' type='submit'> {!isSubmitting ? "Save Information" : <div className='w-4 h-4 border-4 border-red-600 border-dotted rounded-full animate-spin'></div>}</button>
                <button
                  disabled={isSubmitting}
                  type="button"
                  onClick={() => setIsEdit(false)}
                  className="py-2 px-10 border border-gray-300 rounded-full hover:bg-gray-100 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
      }




    </div>
  )
}

export default MyProfile