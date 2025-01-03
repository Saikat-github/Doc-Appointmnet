import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const [state, setState] = useState('Doctor');
    const [loader, setLoader] = useState(false);
    const {register, handleSubmit, reset} = useForm()
    
    const {setToken, backendUrl} = useContext(AdminContext);
    const {setDToken, dToken} = useContext(DoctorContext);

    const navigate = useNavigate();

    const onsubmit = async (data) => {
        try {
            setLoader(true);
            if(state==="Admin") {
                const response = await axios.post(backendUrl+'/api/admin/login', data);
                if(response.data.success) {
                    localStorage.setItem("token", response.data.token);
                    setToken(response.data.token);
                    navigate("/admin-dashboard")
                } else {
                    toast.error(response.data.message);
                }
            } else {
                const response = await axios.post(backendUrl+'/api/doctor/login', data);
                if(response.data.success) {
                    localStorage.setItem("dToken", response.data.token);
                    setDToken(response.data.token);
                    navigate("/doctor-dashboard")
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
            reset()
        }
    }


  return (
    <form onSubmit={handleSubmit(onsubmit)} action="" className='h-screen flex justify-center my-32'>
        <div className='h-60 w-80 shadow-lg rounded-lg text-xs sm:text-sm py-4 px-10 space-y-2'>
            <p className='text-center my-1 text-lg text-primary font-semibold'>{state} Login</p>
            <div className='space-y-1'>
                <p>Email</p>
                <input type="email" {...register('email', {required: true})} className='border w-full px-2 py-0.5 border-primary outline-primary'/>
            </div>
            <div className='space-y-1'>
                <p>Password</p>
                <input type="password" {...register('password',{required: true})} className='border w-full px-2 py-0.5 border-primary outline-primary'/>
            </div>
            <button disabled={loader} className={`text-center w-full bg-primary text-white rounded-sm py-1 hover:bg-opacity-85 transition-all duration-300 ${loader && "bg-opacity-85"} flex justify-center items-center`}>{loader ? <div className='w-4 h-4 border-2 rounded-full border-t-transparent animate-spin'></div> : "Login"}</button>
            {
                state === 'Admin' ?
                <p className='text-xs'>Doctor Login? <span onClick={() => setState('Doctor')} className='text-primary cursor-pointer'>Click here</span></p>
                : <p className='text-xs'>Admin Login? <span onClick={() => setState('Admin')} className='text-primary cursor-pointer'>Click here</span></p>
            }
        </div>
    </form>
  )
}

export default Login