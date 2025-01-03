import { createContext, useState } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';



export const DoctorContext = createContext()

const DoctorContextProvider = ( props ) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '');
    const [appointments, setAppointments] = useState([]);
    const [loader, setLoader] = useState(false);
    const [dashData, setDashData] = useState({});
    const [profileData, setProfileData] = useState(null);

    
    const getAppointments = async () => {
        try {
            setLoader(true);
            const { data } = await axios.get(backendUrl+"/api/doctor/appointments", {headers: {dToken}});
            if (data.success) {
                setAppointments(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoader(false);
        }
    }



    const completeAppointment = async (appointmentId) => {
        try {
            setLoader(true)
            const {data} = await axios.post(backendUrl+"/api/doctor/complete-appointment", {appointmentId}, {headers: {dToken}});
            if (data.success) {
                getAppointments()
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoader(false);
        }
    }



    const cancelAppointment = async (appointmentId) => {
        try {
            setLoader(true);
            const {data } = await axios.post(backendUrl+"/api/doctor/cancel-appointment", {appointmentId}, {headers: {dToken}});
            if (data.success) {
                getAppointments
                toast.success(data.message);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(data.message)         
        } finally {
            setLoader(false);
        }
    }



    const getDashData = async () => {
        try {
            setLoader(true);
            const {data} = await axios.get(backendUrl+"/api/doctor/dashboard", {headers: {dToken}});    
            if (data.success) {
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoader(false);
        }
    }



    const getProfileData = async () => {
        try {
            setLoader(true);
            const {data} = await axios.get(backendUrl+"/api/doctor/profile", {headers: {dToken}});  
            if (data.success) {
                setProfileData(data.profileData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
                console.log(error);
                toast.error(error.message);
        } finally {
            setLoader(false);
        }
    }


    const value = {backendUrl, dToken, setDToken, getAppointments, appointments, completeAppointment, cancelAppointment, loader, setLoader, dashData, setDashData, getDashData, profileData, setProfileData, getProfileData};

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;