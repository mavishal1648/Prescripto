import express from 'express'
import { bookAppointment, cancelAppointment, getAppointments, getProfile, loginUser, paymentViaRazorPay, registerUser, updateProfile, verifyRazorPay } from '../controllers/user.controller.js';
import { authUser } from '../middlewares/auth.user.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser);

userRouter.post('/login',loginUser);

userRouter.get('/get-profile',authUser,getProfile); 

userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile);

userRouter.post('/book-appointment',authUser,bookAppointment); 

userRouter.get('/appointments',authUser,getAppointments);

userRouter.post('/cancel-appointment',authUser,cancelAppointment);

userRouter.post('/payment-razorpay',authUser,paymentViaRazorPay);

userRouter.post('/verify-payment',authUser,verifyRazorPay)

export default userRouter;