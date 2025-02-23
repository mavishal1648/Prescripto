import express from 'express'
import { appointmentsDoctor, cancelAppointment, completeAppointment, dashboardData, doctorList, getProfile, loginDoctor, updateDoctorProfile } from '../controllers/doctor.controller.js';
import authDoctor from '../middlewares/auth.doctor.js';

const doctorRouter = express.Router();

doctorRouter.get("/list",doctorList);
doctorRouter.post('/login',loginDoctor);
doctorRouter.get('/doctor-appointments',authDoctor,appointmentsDoctor);
doctorRouter.post('/complete-appointment',authDoctor,completeAppointment);
doctorRouter.post('/cancel-appointment',authDoctor,cancelAppointment); 
doctorRouter.get('/dashboard',authDoctor,dashboardData);
doctorRouter.get('/profile',authDoctor,getProfile);
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile);

export default doctorRouter;