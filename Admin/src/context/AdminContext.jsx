import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AdminContext = createContext();

const AdminContextProvider = ({children}) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL 

    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
    const [doctors,setDoctors] = useState([]);
    const [AllAppointments,setAllAppointments] = useState([]);
    const [dashData,setDashData] = useState(false);
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

    const getAllDoctors = async()=>{
        try {
            const response = await axios.get(backendUrl+'api/admin/get-doctors',{
                headers:{
                    Authorization:token
                }
            });
            if(response.data.success){
                setDoctors(response.data.doctors);
                console.log(response.data.doctors);
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    }

    const changeAvailability = async(docId)=>{
        try {
           const response = await axios.post(backendUrl+'api/admin/change-availability',{docId},{
            headers:{
                Authorization:token
            }
           })
           if(response.data.success){
            toast.success(response.data.message);
            getAllDoctors();
           }else{
            toast.error(response.data.message);
           }
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    }

    const getAllAppointments = async()=>{
        try {
            const response = await axios.get(backendUrl+'api/admin/get-appointments',{
                headers:{
                    Authorization:token
                }
            })
            if(response.data.success){
                setAllAppointments(response.data.appointments); 
                console.log(response.data.appointments);
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
            const response = await axios.post(backendUrl+'api/admin/cancel-appointment',{appointmentId},{
                headers:{
                    Authorization:token
                }
            })
            if(response.data.success){
                toast.success(response.data.message);
                getAllAppointments();
            }
            else{
                toast.error(response.data.message);
                console.log(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    }

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split("_");
        return (
          dateArray[0] + " " + months[Number(dateArray[1] - 1)] + " " + dateArray[2]
        );
      };

    const getDashData = async()=>{
        try {
            const response = await axios.get(backendUrl+'api/admin/dashboard',{
                headers:{
                    Authorization:token
                }
            })
            if(response.data.success){
                setDashData(response.data.dashData);
                console.log(response.data.dashData);
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    }

    const value = {
        setToken,
        token,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        getAllAppointments,
        setAllAppointments,
        AllAppointments,
        cancelAppointment,
        getDashData,
        dashData,
        slotDateFormat
    }
    return(
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>        
    )   
}

export default AdminContextProvider;
