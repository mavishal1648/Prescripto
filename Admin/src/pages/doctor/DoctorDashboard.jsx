import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { 
    dashboardData, 
    completeAppointment, 
    cancelAppointment, 
    setDashboardData, 
    getDashboardData, 
    dToken 
  } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashboardData();
    }
  }, []);

  const handleCancel = (appointmentId)=>{
    cancelAppointment(appointmentId);

  }
  

  return (
    dashboardData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashboardData.earnings}$
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashboardData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashboardData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>
          <div className="pt-4 border border-t-0">
            {dashboardData.latestAppointment.map((appointment, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={appointment.userData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {appointment.userData.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(appointment.slotDate)}
                  </p>
                </div>
                {
                  appointment.cancelled ? <p className="text-red-500 font-medium text-xs">Cancelled</p>:appointment.isCompleted?<p className="text-green-500 font-medium text-xs">Completed</p>:<div className="flex">
                  <img
                    className="cursor-pointer"
                    onClick={() => cancelAppointment(appointment._id)}
                    src={assets.cancel_icon}
                    alt=""
                  />
                  <img
                    onClick={() => completeAppointment(appointment._id)}
                    src={assets.tick_icon}
                    alt=""
                  />
                </div>
                }
                {/* {appointment.isCompleted ? (
                  <p className="text-green-500 font-medium text-xs">Completed</p>
                ) : (
                  <div className="flex">
                    <img
                      className="cursor-pointer"
                      onClick={() => cancelAppointment(appointment._id)}
                      src={assets.cancel_icon}
                      alt=""
                    />
                    <img
                      className="cursor-pointer"
                      onClick={() => completeAppointment(appointment._id)}
                      src={assets.tick_icon}
                      alt=""
                    />
                  </div>
                )} */}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;