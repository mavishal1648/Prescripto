import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const {getAppointments,appointments,dToken,cancelAppointment,completeAppointment} = useContext(DoctorContext);
  const {calculateAge,slotDateFormat} = useContext(AppContext);

  useEffect(() => {
    if(dToken){
      getAppointments();
    }
  },[dToken])

  // const filteredAppointments = appointments.filter(appointment => !appointment.cancelled);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white rounded border text-sm overflow-y-scroll max-h-[80vh] min-h-[50vh]'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fee</p>
          <p>Action</p>
        </div>
        {
          appointments && appointments.reverse().map((appointment,index)=>(
            <div key={index} className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>
              <p className='max-sm:hidden'>{index+1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={appointment.userData.image}/>
                <p>{appointment.userData.name}</p>
              </div>
              <div>
                <p className='text-xs inline border border-primary px-2 rounded-full'>{appointment.payment ? 'Online':'Cash'}</p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(appointment.userData.date_of_birth)}</p>
              <p>{slotDateFormat(appointment.slotDate)},{appointment.slotTime}</p>
              <p>{appointment.amount}$</p>
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
              
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorAppointments