import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import {useForm} from 'react-hook-form'
import { AdminContext } from '../../context/AdminContext';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios'


const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);

  const {backendUrl, token} = useContext(AdminContext);

  const {register, handleSubmit, reset, formState: {isSubmitting}} = useForm();

  const onsubmit = async (data) => {
    try {
      if (!docImg) {
        return toast.error('Please upload doctor image');
      }
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('experience', data.experience);
      formData.append('speciality', data.speciality);
      formData.append('degree', data.degree);
      formData.append('address', data.address);
      formData.append('fees', data.fees);
      formData.append('about', data.about);


      const res = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {headers: {token}});
      if(res.data.success) {
        toast.success(res.data.message);
        reset();
        setDocImg(null)
      } else {
        toast.error(res.data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <p className='mx-6 mt-2 text-2xl font-semibold text-center'>Add Doctor</p>
      <div className='bg-white p-6 flex gap-6 text-xs flex-col my-2 sm:mx-6 text-gray-700 rounded-md'>
        <div className='flex gap-4 items-center'>
          <label htmlFor="doc-img">
            <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} className='w-20 rounded-full bg-gray-100 cursor-pointer' />
          </label>
          <input {...register("image")} type="file" id='doc-img' onChange={(e) => setDocImg(e.target.files[0])} hidden />
          <p>Upload Doctor <br />Picture</p>
        </div>

        <div className='space-y-4'>
          <div className='flex lg:gap-10 flex-col lg:flex-row gap-4'>
            <div className='flex flex-col gap-4'>
              <div>
                <p>Your Name</p>
                <input className='py-2 px-3 border w-[70vw] sm:w-72  rounded-sm mt-2' type="text" placeholder='Name' {...register("name")} required />
              </div>
              <div>
                <p>Doctor Email</p>
                <input className='py-2 px-3 border w-[70vw] sm:w-72  rounded-sm mt-2' type="email" placeholder='Email' {...register("email")} required />
              </div>
              <div>
                <p>Doctor Password</p>
                <input className='py-2 px-3 border w-[70vw] sm:w-72  rounded-sm mt-2' type="password" placeholder='Password' {...register("password")} required />
              </div>
              <div>
                <p>Experience</p>
                <select className='py-2 px-3 border w-[70vw] sm:w-72  rounded-sm mt-2 text-gray-700' {...register("experience")} required>
                  <option value="1 Year">1 Year</option>
                  <option value="2 Year">2 Year</option>
                  <option value="3 Year">3 Year</option>
                  <option value="4 Year">4 Year</option>
                  <option value="5 Year">5 Year</option>
                  <option value="6 Year">6 Year</option>
                  <option value="7 Year">7 Year</option>
                  <option value="8 Year">8 Year</option>
                  <option value="9 Year">9 Year</option>
                  <option value="10 Year">10 Year</option>
                  <option value="10+ Year">10+ Year</option>
                </select>
              </div>

            </div>
            <div className='flex flex-col gap-4'>
              <div>
                <p>Speciality</p>
                <select className='py-2 px-3 border w-[70vw] sm:w-72  rounded-sm mt-2' {...register("speciality")} required>
                  <option value="General Physician">General Physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>
              <div>
                <p>Degree</p>
                <input className='py-2 px-3 border w-[70vw] sm:w-72  rounded-sm mt-2' type="text" placeholder='Degree' {...register("degree")} required />
              </div>
              <div>
                <p>Address</p>
                <input className='py-2 px-3 border w-[70vw] sm:w-72  rounded-sm mt-2' type="text" placeholder='Address' {...register("address")} required />
              </div>
              <div>
                <p>Fees</p>
                <input className='py-2 px-3 border w-[70vw] sm:w-72  rounded-sm mt-2' type="number" placeholder='Doctor Fees' {...register("fees")} required />
              </div>
            </div>

          </div>
          <div>
            <p>About Doctor</p>
            <textarea rows={8} className='py-2 px-3 border rounded-sm w-full mt-2' placeholder='Write about doctor' {...register("about")}></textarea>
          </div>
        </div>
        <button type='submit' disabled={isSubmitting} className={`py-2 px-10 bg-primary text-white rounded-full w-36 hover:bg-opacity-80 transition-all duration-300`}>{isSubmitting ? <div className='border-2 border-white w-4 h-4 animate-spin rounded-full border-t-transparent'></div> : "Add Doctor" }</button>
      </div>

    </form>
  )
}

export default AddDoctor