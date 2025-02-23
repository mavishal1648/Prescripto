import express from 'express'
import { addDoctor, adminDashboard, cancelAppointment, getAppointments, getDoctors, loginAdmin } from '../controllers/admin.controller.js'
import upload from '../middlewares/multer.js';
import { authAdmin } from '../middlewares/auth.admin.js';
import { changeAvailability } from '../controllers/doctor.controller.js';

const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);
adminRouter.post('/login',loginAdmin);
adminRouter.get('/get-doctors',authAdmin,getDoctors);
adminRouter.post('/change-availability',authAdmin,changeAvailability);
adminRouter.get('/get-appointments',authAdmin,getAppointments);
adminRouter.post('/cancel-appointment',authAdmin,cancelAppointment);
adminRouter.get('/dashboard',authAdmin,adminDashboard);

export default adminRouter;