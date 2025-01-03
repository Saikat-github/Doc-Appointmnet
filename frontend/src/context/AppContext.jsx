import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import {toast} from 'react-toastify';
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const getDoctorsData = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/doctor/list');
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }



    const getUserData = async () => {
        try {
            const res = await axios.get(backendUrl+'/api/user/getuser', {headers: {token}});
            if (res.data.success) {
                setUserData(res.data.user);
            } else {
                logout(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }


    const logout = (msg) => {
        toast.warn(msg)
        localStorage.removeItem('token');
        setToken(null);
        setUserData(null);
        navigate('/login');
    }



    useEffect(() => {
        getDoctorsData();
    }, [])

    

    useEffect(() => {
        if (token) {
            getUserData()
        } else {
            setUserData(null);
        }
    }, [token])



    const value = {
        doctors, 
        token, 
        setToken,
        backendUrl,
        userData,
        setUserData,
        getUserData,
        getDoctorsData,
        logout
    }
    


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;