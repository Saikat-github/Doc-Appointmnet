import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify';
import axios from 'axios';
import ConfirmationModal from '../components/ConfirmationModal';
import { useNavigate } from 'react-router-dom';



const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loader, setLoader] = useState(false);
  const [cancelloader, setCancelLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
  const [appointmentId, setAppointmentId] = useState(null);

  const navigate = useNavigate();

  function convertDateFormat(dateStr) {
    const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // Split the input string into day, month, and year
    const [day, month, year] = dateStr.split("_");

    // Convert month from numeric value to short name
    const monthName = monthsShort[parseInt(month, 10) - 1];

    // Return the formatted date
    return `${day} ${monthName} ${year}`;
  }



  const getUserAppointments = async () => {
    try {
      setLoader(true)
      const { data } = await axios.get(backendUrl + "/api/user/list-appointments", { headers: { token } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setLoader(false)
    }
  }



  const confirmCancel = async () => {
    try {
      setCancelLoader(true)
      const { data } = await axios.post(backendUrl + "/api/user/cancel-appointment", { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setCancelLoader(false);
      setIsModalOpen(false);
    }
  }



  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])


  if (loader) {
    return (<div className='text-3xl text-primary mt-20 mb-48 text-center'>Loading...</div>)
  }


  // Open the modal when delete button is clicked
  const openModal = (id) => {
    setAppointmentId(id);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setAppointmentId(null);
  };



  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (res) => {
        console.log(res);
        try {
          const { data } = await axios.post(backendUrl + "/api/user/verify-razorpay", res, { headers: { token } });
          if (data.success) {
            getUserAppointments();
            navigate("/my-appointments");
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }

      }
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  }



  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/payment-razorpay", { appointmentId }, { headers: { token } });
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {

    }
  }




  return (
    <div className='mb-20'>
      <h1 className='text-xl text-center my-4'>MY APPOINTMENT</h1>

      {appointments.map((item, idx) => (
        <div key={idx}>
          <hr className='my-2 mx-4' />
          <div className='text-xs text-gray-700 flex flex-col sm:flex-row sm:justify-between items-center gap-10 sm:gap-0 sm:p-4'>
            <div className='flex gap-4'>
              <img src={item.docData.image} className='w-28 sm:w-36 bg-blue-100' alt="" />
              <div className='space-y-2'>
                <h2 className='text-sm font-semibold'>{item.docData.name}</h2>
                <p>{item.docData.speciality}</p>
                <p className='font-semibold'>Address</p>
                <p>{item.docData.address}</p>
                <p>
                  <span className='font-semibold'>Date & Time :</span> {convertDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
            </div>
            {
              item.cancelled
                ?
                <div className='flex flex-col gap-2'>
                  <p className='py-2 px-10 rounded border-gray-800 border-2 text-red-600 font-medium'>Appointment Cancelled</p>
                </div>
                :
                <div className='flex flex-col gap-2'>
                  {item.isCompleted 
                  ? <button disabled={true} className='py-2 px-10 rounded border-gray-800 border-2 text-green-700 font-medium transition-all duration-300'>Appointment Completed</button> 
                  : <button disabled={item.payment} onClick={() => appointmentRazorpay(item._id)} className={`py-2 px-10 rounded bg-primary text-white hover:bg-opacity-80 transition-all duration-300`}>{item.payment ? "Paid" : "Pay Now"}</button>}

                  <button disabled={cancelloader} onClick={() => openModal(item._id)} className={`py-2 px-10 rounded bg-red-600 text-white hover:bg-opacity-80 transition-all duration-300 flex items-center gap-2 ${cancelloader && "bg-opacity-80"} ${item.isCompleted && "hidden"}`}>Cancel Appointment {cancelloader && <div className='w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full'></div>}</button>
                  {/* Modal for confirmation */}
                  <ConfirmationModal
                    isOpen={isModalOpen}
                    message="Are you sure you want to cancel your appointment?"
                    onConfirm={confirmCancel} // Handle confirm action
                    onCancel={closeModal} // Handle cancel action
                  />
                </div>
            }
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyAppointments