import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { token, AllAppointments, getAllAppointments,cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, } = useContext(AppContext);
  useEffect(() => {
    if (token) {
      getAllAppointments();
    }
  }, [token]);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white rounded border text-sm overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {AllAppointments &&
          AllAppointments.map((appointment, index) => (
            <div
              key={index}
              className="flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-3 px-6 border-b hover:bg-gray-50"
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-2">
                <img
                  className="w-8 rounded-full"
                  src={appointment.userData.image}
                  alt=""
                />
                <p>{appointment.userData.name}</p>
              </div>
              <p className="max-sm:hidden">
                {calculateAge(appointment.userData.date_of_birth)}
              </p>
              <p>
                {slotDateFormat(appointment.slotDate)}, {appointment.slotTime}
              </p>
              <div className="flex items-center gap-2">
                <img
                  className="w-8 rounded-full bg-gray-200"
                  src={appointment.doctorData.image}
                  alt=""
                />
                <p>{appointment.doctorData.name}</p>
              </div>
              <p>{appointment.doctorData.fees}$</p>
              {appointment.cancelled ? (
                <p className="text-red-500 text-xs font-medium">Cancelled</p>
              ) : appointment.isCompleted ? <p className="text-green-500 text-xs font-medium">Completed</p> : (
                <img
                  onClick={() => cancelAppointment(appointment._id)}
                  src={assets.cancel_icon}
                  alt=""
                  className="w-10 cursor-pointer "
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllAppointments;
