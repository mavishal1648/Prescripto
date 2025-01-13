import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const MyAppointments = () => {
  const { backendUrl, token,getDoctorsData} = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
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
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1] - 1)] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async (req, res) => {
    try {
      const response = await axios.get(backendUrl + "api/user/appointments", {
        headers: {
          Authorization: token,
        },
      });
      if (response.data.success) {
        setAppointments(response.data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await axios.post(
        backendUrl + "api/user/cancel-appointment",
        { appointmentId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getUserAppointments();
        getDoctorsData();

      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const initPay = (order)=>{
    const options = {
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Appointment Payment',
      description:'Appointment Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async(response)=>{
        console.log(response);
        try {
          const {data} = await axios.post(backendUrl+'api/user/verify-payment',response,{headers:{Authorization:token}});
          if(data.success){
            toast.success(data.message);
            getUserAppointments();
            navigate('/my-appointments');
          }

        } catch (error) {
          toast.error(error.message);
          console.log(error.message);
        }
      }
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const paymentRazorPay = async(appointmentId)=>{
    try {
      const response = await axios.post(backendUrl+'api/user/payment-razorpay',{appointmentId},{headers:{Authorization:token}});
      if(response.data.success){
        initPay(response.data.order);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);


  return (
    <div>
      <p className="mt-12 pb-3 font-medium text-gray-600 border-b">
        My Appointments
      </p>
      <div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
          >
            <div>
              <img
                src={item.doctorData.image}
                alt="doc_image"
                className="w-32 bg-indigo-50"
              />
            </div>
            <div className="flex-1 text-sm text-gray-800">
              <p className="text-neutral-800 font-semibold">
                {item.doctorData.name}
              </p>
              <p>{item.doctorData.speciality}</p>
              <p className="text-gray-400 font-semibold mt-1">Address:</p>
              <p className="text-xs">{item.doctorData.address.line1}</p>
              <p className="text-xs">{item.doctorData.address.line2}</p>
              <p className="text-sm mt-1 text-gray-400 font-semibold">
                Date & Time:{" "}
                <span className="text-sm  text-neutral-500 font-semibold">
                  {slotDateFormat(item.slotDate)} || {item.slotTime}
                </span>
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-3 justify-end">
              {!item.cancelled && item.payment&& !item.isCompleted && <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">Paid</button>}
             {!item.cancelled &&  !item.payment && !item.isCompleted && <button className="text-sm  text-center sm:min-w-48 py-2 border rounded  text-stone-500 hover:bg-primary hover:text-white" onClick={()=>{paymentRazorPay(item._id)}}>
                Pay here
              </button> } 
              {!item.cancelled && !item.payment &&  !item.isCompleted && (
                <button
                  onClick={() => {
                    cancelAppointment(item._id);
                  }}
                  className="text-sm  text-center sm:min-w-48 py-2 border rounded  text-stone-500 hover:bg-red-500 hover:text-white"
                >
                  Cancel appointment
                </button>
              )}
              {item.cancelled && !item.isCompleted && <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">Appointment Cancelled</button>}
              {
                item.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Completed</button>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;


