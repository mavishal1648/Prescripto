import doctorModel from "../models/doctor.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointment.model.js";


export const changeAvailability = async (req, res) => {
    try {
        const {docId} = req.body;
        const docData = await doctorModel.findById(docId);
        docData.available = !docData.available;
        await docData.save();
        res.json({
            success: true,
            message: "Availability changed"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const doctorList = async(req,res)=>{
    try {
        const doctors = await doctorModel.find().select(["-password","-email"]);
        res.json({
            success: true,
            doctors,
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// doctor login

export const loginDoctor = async (req, res) => {
    try {
      const { email, password } = req.body;
      const doctor = await doctorModel.findOne({ email });
      if (!doctor) {
        return res.json({
          success: false,
          message: "Doctor not found",
        });
      }   
      const passwordMatch = await bcrypt.compare(password, doctor.password);
      if (!passwordMatch) {
        return res.json({
          success: false,
          message: "Invalid credentials",
        });
      }
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      return res.json({
        success: true,
        token,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: error.message,
      });
    }
};

// doctor appointments
export const appointmentsDoctor = async (req, res) => {
  try {
      const docId = req.docId;
      const appointments = await appointmentModel.find({docId});
      res.json({
          success: true,
          appointments
      })
  } catch (error) {
    console.log(error);
      return res.json({
        success: false,
        message: error.message,
      });

  }
}

// appointment completed
export const completeAppointment = async (req, res) => {
  try {
      const {appointmentId} = req.body;
      const docId = req.docId;
      const appointmentData = await appointmentModel.findById(appointmentId);
      if(appointmentData && appointmentData.docId == docId){
        await appointmentModel.findByIdAndUpdate(appointmentId, {
          $set: {
            isCompleted: true
          }
        })
        return res.json({
          success: true,
          message: "Appointment completed"
        })
      }
      else{
        return res.json({
          success: false,
          message: "Invalid Appointment"
        })
      }

  } catch (error) {
    console.log(error);
      return res.json({
        success: false,
        message: error.message,
      });
  }
}

// cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
      const {appointmentId} = req.body;
      const docId = req.docId;
      const appointmentData = await appointmentModel.findById(appointmentId);
      if(appointmentData && appointmentData.docId == docId){
        await appointmentModel.findByIdAndUpdate(appointmentId, {
          $set: {
            cancelled: true
          }
        })
        return res.json({
          success: true,
          message: "Appointment cancelled"
        })
      }
      else{
        return res.json({
          success: false,
          message: "Invalid Appointment"
        })
      }

  } catch (error) {
    console.log(error);
      return res.json({
        success: false,
        message: error.message,
      });
  }
}

// dashboard data
export const dashboardData = async (req, res) => {
  try {
      const docId = req.docId;
      const appointments = await appointmentModel.find({docId});
      let earnings = 0;
      appointments.map((appointment)=>{
        if(appointment.isCompleted || appointment.payment){
          earnings += appointment.amount;
        }
      })
      
      let patients = [];
      appointments.map((appointment)=>{
        if(!patients.includes(appointment.userId)){
          patients.push(appointment.userId);
        }
      })
      const dashboardData = {
        earnings,
        appointments:appointments.length,
        patients:patients.length,
        latestAppointment:appointments.reverse().slice(0,5)
      }
      return res.json({
        success: true,
        dashboardData
      })
  } catch (error) {
    console.log(error);
      return res.json({
        success: false,
        message: error.message,
      });
  }
}

// get doctor profile
export const getProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const profileData = await doctorModel.findById(docId).select("-password");
    return res.json({
      success: true,
      profileData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// update doctor profile
export const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const {fees,address,available} = req.body;
    await doctorModel.findByIdAndUpdate(docId, {
      $set: {
        fees,
        address,
        available,
      },
    })
    return res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
}