import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Login');
  const {backendUrl, setToken, token} = useContext(AppContext);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors,isSubmitting }, reset } = useForm();
  


  const onsubmit = async (data) => {
    console.log(data);
    if (token) {
      navigate('/');
      return toast.error('You are already logged in');
    }
    try {
      let res = null
      if (state === 'Login') {
         res = await axios.post(backendUrl+'/api/user/login', data);
      } else {
         res = await axios.post(backendUrl+'/api/user/register', data);
      }

      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        toast.success(`${state} successful`);
        reset()
        navigate('/');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }


  

  return (
    <div className='h-screen flex justify-center items-start my-24'>
      <form onSubmit={handleSubmit(onsubmit)} className='flex text-xs sm:text-sm flex-col border p-8 rounded-md gap-6 text-gray-700 shadow-lg w-80'>
        <div>
          <h1 className='text-lg font-semibold'>{state}</h1>
          <p>Please {state} to book appointment</p>
        </div>

        {state === "SignUp" &&
          <div>
            <input className='w-full border py-2 px-2' type="text" placeholder='Enter your name' {...register("name", { required: "Please enter your name" })} />
            {errors.name && <p className='text-red-600 text-xs'>{errors.name.message}</p>}
          </div>
        }
        


        <div>
        <input className='w-full border py-2 px-2' type="email" placeholder='Enter your email'{...register("email", { required: "Email is required" })} />
        {errors.email && <p className='text-red-600 text-xs'>{errors.email.message}</p>}
        </div>

        <div>
        <input className='w-full border py-2 px-2' type="password" placeholder='Enter you password' {...register("password", { required: "Password is required" })} />
        {errors.password && <p className='text-red-600 text-xs'>{errors.password.message}</p>}
        </div>

        <button disabled={isSubmitting} className='flex  gap-2 justify-center items-center py-2 px-4 text-center bg-primary hover:bg-opacity-80 text-white transition-all duration-300'>
          {state} {isSubmitting && <div className='w-4 h-4 border-2 border-white border-dashed animate-spin rounded-full'></div> }
        </button>

        <p>{state === "SignUp" ? "Already have an account?" : "Don't have an account?"} <span className='cursor-pointer text-primary' onClick={() => setState(state === "Login" ? "SignUp" : "Login")}>{state === 'Login' ? "SignUp" : "Login"} here</span></p>
      </form>
    </div>
  )
}

export default Login