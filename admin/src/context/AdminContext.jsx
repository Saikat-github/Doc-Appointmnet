import { createContext } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';



export const AdminContext = createContext()

const AdminContextProvider = ( props ) => {
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [dashData, setDashData] = useState(null);


    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    

    const getAllDoctors = async () => {
        try {
            const {data} = await axios.post(backendUrl+'/api/admin/all-doctors', {}, {headers: {token}});
            if(data.success){
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };



    const changeAvailability = async (docId) => {
        try {
            const {data} = await axios.post(backendUrl+'/api/admin/change-availability', {docId}, {headers: {token}});
            if (data.success) {
                toast.success(data.message);
                getAllDoctors()
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl+"/api/admin/appointments", {headers: {token}});
            if (data.success) {
                setAppointments(data.appointments.reverse());
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }



    const getDashData = async () => {
        try {
            const {data} = await axios.get(backendUrl+"/api/admin/dashboard", {headers: {token}});
            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }





    const value = {
        token,
        setToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        appointments,
        setAppointments,
        getAllAppointments,
        dashData,
        getDashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;