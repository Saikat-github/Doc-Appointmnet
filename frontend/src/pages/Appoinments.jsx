import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appoinments = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, backendUrl, token, getDoctorsData, logout } = useContext(AppContext);



  const [docSlots, setDocSlots] = useState(null);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('')
  const [loader, setLoader] = useState(false);

  const selectedDoc = doctors.filter((d) => (d._id === docId))[0];

  const getAvailbleSlots = async () => {
    setDocSlots([])
    //getting current date

    let today = new Date();
    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i)

      //setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i)
      endTime.setHours(19, 0, 0, 0)

      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0)
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime

        const isSlotAvailable = (selectedDoc?.slots_booked[slotDate] && selectedDoc?.slots_booked[slotDate].includes(slotTime)) ? false : true


        if (isSlotAvailable) {
          //add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        //increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)

      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  useEffect(() => {
    getAvailbleSlots();
  }, [selectedDoc])

  // useEffect(() => {
  //   console.log(docSlots)
  // }, [selectedDoc])


  const daysOfWeek = [
    "Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"
  ]

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appoinment")
      return navigate("/login")
    }

    try {
      setLoader(true);
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(backendUrl + "/api/user/book-appointment", { docId, slotDate, slotTime }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoader(false)
    }
  }

  return (
    <div>
      <div className='my-10 flex gap-4 flex-col md:flex-row'>
        <div className='bg-primary relative rounded-lg sm:w-80 w-60 h-80 md:h-60'>
          <img src={selectedDoc?.image} alt="" className='absolute bottom-0 ' />
        </div>
        <div className='p-6 flex flex-col border-2 rounded-lg w-full gap-2'>
          <h1 className='text-2xl flex gap-1'>{selectedDoc?.name} <img src={assets.verified_icon} className='w-4' alt="" /></h1>
          <h2 className='text-sm text-gray-700'>{selectedDoc?.degree} - {selectedDoc?.speciality} <span className='py-1 px-2 border-2 text-xs rounded-full'>{selectedDoc?.experience}</span></h2>
          <h3 className='text-gray-800'>About ⓘ</h3>
          <p className='text-xs text-gray-700'>{selectedDoc?.name} has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.</p>
          <p className='text-gray-800'>Appointment fee : ₹{selectedDoc?.fees}</p>
        </div>
      </div>

      <div className='flex justify-center flex-col items-center gap-2'>
        <h1 className='mt-4 text-xl'>Booking Slots</h1>
        <div className='py-4 flex gap-4 flex-wrap text-gray-900'>
          {docSlots?.map((item, idx) => (
            <div onClick={() => setSlotIndex(idx)} key={idx} className={`flex flex-col gap-2 p-4 rounded-full hover:bg-primary border-2 hover:text-white cursor-pointer w-16 ${slotIndex === idx ? 'bg-primary text-white' : ""}`}>
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>
        <div className='flex flex-wrap gap-2 text-xs text-gray-800 mb-10 justify-center'>
          {docSlots?.length && docSlots[slotIndex]?.map((item, idx) => (
            <p onClick={() => setSlotTime(item.time)} className={`py-1 px-4 rounded-full hover:bg-primary border-2 hover:text-white cursor-pointer ${item.time === slotTime ? "bg-primary text-white" : ""}`} key={idx}>{item.time.toLowerCase()}</p>
          ))}
        </div>
        <button disabled={loader} className={`py-4 px-16 text-center bg-primary text-white rounded-full text-sm hover:scale-105 transition-all duration-300 flex gap-2 items-center ${loader && "bg-opacity-70"}`} onClick={bookAppointment}>Book Appointment {loader && <div className='w-6 h-6 border-2 border-white border-t-transparent animate-spin rounded-full'></div>}</button>
      </div>

      <div className='flex flex-col items-center'>
        <h1 className='text-xl mt-28 mb-2'>Related Doctors</h1>
        <p className='text-xs text-gray-800'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='my-10 w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0 '>
          {doctors.filter((d) => d.speciality === selectedDoc?.speciality).map((doctor, idx) => (
            (doctor._id != selectedDoc?._id)
            &&
            <div onClick={() => navigate(`/appointments/${doctor._id}`)} key={idx} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
              <img className='bg-blue-50' src={doctor.image} alt="" />
              <div className='p-4'>
              {
                  doctor.available
                  ?
                  <div className='flex items-center gap-2 text-sm text-green-500'>
                  <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                  <p>Available</p>
                </div>
                : 
                <div className='flex items-center gap-2 text-sm text-red-500'>
                  <p className='w-2 h-2 bg-red-500 rounded-full'></p>
                  <p>Not Available</p>
                </div>
                }
                <p className='text-gray-900 text-lg font-medium'>{doctor.name}</p>
                <p className='text-gray-600 text-sm'>{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Appoinments