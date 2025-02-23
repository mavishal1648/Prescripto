import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from "cloudinary";
import doctorModel from "../models/doctor.model.js";
import appointmentModel from "../models/appointment.model.js";
import userModel from "../models/user.model.js";


// Adding doctor
export const addDoctor = async(req, res)=>{
    try{
        const {name, email, password, speciality, degree, experience,about,fees,address} = req.body;
        const image = req.file;
       
    
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !image){
            return res.json({
                success: false,
                message: "Please fill all the fields"
            })
        }

        if(!validator.isEmail(email)){
            return res.json({
                success: false,
                message: "Please enter a valid email"
            })
        }

        if(password.length < 8){
            return res.json({
                success: false,
                message: "Please enter a strong password"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const imageUpload = await cloudinary.uploader.upload(image.path,{
            resource_type: "image",
        });
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            image: imageUrl,
        }

        await doctorModel.create(doctorData);

        return res.json({
            success: true,
            message: "Doctor added successfully"
        })
    }catch(error){
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}

// Admin Login
export const loginAdmin = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.json({
                success: false,
                message: "Please fill all the fields"
            })
        }
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            return res.json({
                success: true,
                token,
                message: "Admin logged in successfully",
            })
        }else{
            return res.json({
                success: false,
                message: "Invalid credentials"
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}

// get doctors

export const getDoctors = async(req,res)=>{
    try {
        const doctors = await doctorModel.find().select("-password");
        if(!doctors){
            return res.json({
                success: false,
                message: "No doctors found"
            })
        }else{
            return res.json({
                success: true,
                doctors,
                message: "Doctors fetched successfully"
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}

// get all appointments 

export const getAppointments = async(req,res)=>{
    try {
        const appointments = await appointmentModel.find({});
        res.json({
            success: true,
            appointments
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}

// appointment cancellation
export const cancelAppointment = async (req, res) => {
    try {
   
      const { appointmentId } = req.body;
      
      const appointmentData = await appointmentModel.findById(appointmentId);
      
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
  
      const { docId, slotDate, slotTime } = appointmentData;
      const doctorData = await doctorModel.findById(docId);
      let slots_booked = doctorData.slots_booked;
      slots_booked[slotDate] = slots_booked[slotDate].filter((slot) => {
        slotTime != slot;
      });
      await doctorModel.findByIdAndUpdate(docId, {
        slots_booked,
      });
  
      res.json({
        success: true,
        message: "Appointment cancelled successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: error.message,
      });
    }
  };

  // dashboard data
export const adminDashboard = async(req,res)=>{
    try {
        const doctors = await doctorModel.find({});
        const users = await userModel.find({});
        const appointment = await appointmentModel.find({})
        const dashData = {
            doctors:doctors.length,
            patients:users.length,
            appointments:appointment.length,
            latestAppointment:appointment.reverse().slice(0,5)
        }
        res.json({
            success: true,
            dashData
        })
        
    } catch (error) {
        console.log(error);
      res.json({
        success: false,
        message: error.message,
      });
    }
}