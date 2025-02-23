import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({children}) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL 
    const [dToken,setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'');
    const [appointments,setAppointments] = useState([]);
    const [dashboardData,setDashboardData] = useState(false);
    const [profileData,setProfileData] = useState(false);

    const getProfile = async (req, res) => {
        try {
            const response = await axios.get(backendUrl+'api/doctor/profile',{
                headers:{
                    Authorization:dToken
                }
            })
            if(response.data.success){
                setProfileData(response.data.profileData);
                console.log(response.data.profileData);
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message); 
            console.log(error.message);
        }
    }

    const getAppointments = async()=>{
        try {
            const response = await axios.get(backendUrl+'api/doctor/doctor-appointments',{
                headers:{
                    Authorization:dToken
                }
            })
            if(response.data.success){
                
                setAppointments(response.data.appointments);
                // check the slot booked still there..afterwards..

                console.log(response.data.appointments);
            }else{
                toast.error(response.data.message);
                
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    }

    const completeAppointment = async(appointmentId)=>{
        try {
            const response = await axios.post(backendUrl+'api/doctor/complete-appointment',{appointmentId},{
                headers:{
                    Authorization:dToken
                }
            })
            if (response.data.success) {
                toast.success(response.data.message);
                getAppointments();
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    }
    const cancelAppointment = async(appointmentId)=>{
        try {
            const response = await axios.post(backendUrl+'api/doctor/cancel-appointment',{appointmentId},{
                headers:{
                    Authorization:dToken
                }
            })
            if (response.data.success) {
                toast.success(response.data.message);
                getAppointments();
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    }

    const getDashboardData = async()=>{
        try {
            const response = await axios.get(backendUrl+'api/doctor/dashboard',{
                headers:{
                    Authorization:dToken
                }
            })
            if(response.data.success){
                setDashboardData(response.data.dashboardData);
                console.log(response.data.dashboardData);
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    }

    const value = {
        backendUrl,
        dToken,
        appointments,
        dashboardData,
        setDashboardData,
        getDashboardData,
        setDToken,
        setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        profileData,
        setProfileData,
        getProfile

    }
    return(
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider;
