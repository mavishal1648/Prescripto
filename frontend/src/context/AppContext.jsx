import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";


export const AppContext = createContext();

const AppContextProvider = ({children}) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL 

    const [doctors,setDoctors] = useState([]);

    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false);

    const [userData,setUserData] = useState(false);

    const getDoctorsData = async()=>{
        try {
            const response = await axios.get(backendUrl+'api/doctor/list');
            if(response.data.success){
                setDoctors(response.data.doctors);
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }   
    }

    const loadUserData = async()=>{
        try {
        const response = await axios.get(backendUrl+'api/user/get-profile',{
            headers: {
                Authorization: token
            }
        }); 
        if(response.data.success){
            setUserData(response.data.userData);
        }else{
            toast.error(response.data.message);
        }

        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    }

    useEffect(() => {
        getDoctorsData();
    },[])
    useEffect(() => {
        if(token){
            loadUserData();
        }else{
            setUserData(false);
        }
    },[token])

    const value = {
        doctors,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserData,
        getDoctorsData
    }
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;
