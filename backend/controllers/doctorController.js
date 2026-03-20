import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointment.js"
import validator from "validator";

//Api changeAvailablity
const changeAvailablity = async (req, res) => {

    try {
        const { docId } = req.body
        const docData = await doctorModel.findById(docId);

        if (docData) {
            const updatedDoctor = await doctorModel.findByIdAndUpdate(
                docId,
                { available: !docData.available },
                { new: true }
            );
            res.json({ success: true, message: "Availability changed" })
        } else {
            return res.json({ success: false, message: "Doctor not found" })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// allDoctors List
const DoctorsList = async (req, res) => {
    try {
        const doctorlist = await doctorModel.find({}).select("-password  -email")
        console.log(doctorlist)
        return res.json({ success: true, doctorlist })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }

}

//api for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const doctorData = await doctorModel.findOne({ email });

    if (!doctorData) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, doctorData.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: doctorData._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      token,
      message: "Login successful",
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



//api to get doctor appointment for doctor panel
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.docId;
    const appointments = await appointmentModel.find({ docId });
    res.status(200).json({
      success: true,
      appointments,
      message: "successful"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//api to mark appointment completed for  foctor panel
const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.docId;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    // Convert ObjectId to string before comparing
    if (appointmentData.docId.toString() !== docId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized action"
      });
    }

    await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { isCompleted: true },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Appointment completed"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,message:error.message||"Server error"})
    
  }
};


//api to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    console.log(appointmentId)
    const docId = req.docId; // from middleware

    const appointment = await appointmentModel.findOneAndUpdate(
      { _id: appointmentId, docId: docId },
      { cancelled: true },
      { new: true }
    );

    if (!appointment) {
      return res.status(403).json({
        success: false,
        message: "Invalid appointment or unauthorized"
      });
    }

    return res.json({
      success: true,
      message: "Appointment Cancelled"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({success:false,message:error.message})
  }     
};

//api to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId;

    const appointments = await appointmentModel.find({ docId });

    if (appointments.length === 0) {
      return res.json({
        success: true,
        dashData: {
          earnings: 0,
          appointments: 0,
          patients: 0,
          latestAppointments: []
        }
      });
    }

    // Calculate earnings
    let earnings = 0;
    appointments.forEach((item) => {
      if (item.isCompleted && item.payment) {
        earnings += item.amount;
      }
    });

    // Unique patients
    let patients=[]
    appointments.map((item)=>{
      if(!patients.includes(item.userId.toString())){
        patients.push(item.userId)
      }
    })

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: [...appointments]
        .reverse()
        .slice(0, 5)
    };

    return res.json({
      success: true,
      dashData
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error"
    });
  }
};

//api to get doctor profile for doctor panel
const doctorProfile=async(req,res)=>{
  try{
     const docId=req.docId //get docId from midllware
      console.log(docId)
      if (!docId) {
     return res.status(400).json({ success: false, message: "Doctor ID is required" });
     }
    const doctor=await doctorModel.findById(docId).select("-password");
    if(!doctor){
      return res.status(404).json({success:false,message:"Doctor profile not found"})
    }
    return res.status(200).json({success:true,doctor})
  }catch(error){
    console.error(error)
    res.status(500).json({success:false,message:error.message||"Internal server error"})
  }
}

//api to update doctor profile data from Doctor panel
const updateDoctorProfile = async (req, res) => {
  try {
    const {name, speciality,experience,about,available, line1, line2 } = req.body;
    
    console.log("Body data received:", req.body);
    const docId = req.docId;
    
    
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      docId,
      {
        name,
        experience,
        about,
        speciality,
        available,
        image,
        "address.line1":line1,
        "address.line2":line2,
      }
    );

     if (image) {
          updateData.image = image;
        }
      
        const  updated = await userModel.findByIdAndUpdate(
          userId,
          updateData,
          { new: true }
        );

    if (!updatedDoctor||!docId) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.json({
      success: true,
      message: "Profile updated successfully",
      doctor: updatedDoctor,
    });

  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { changeAvailablity, DoctorsList,loginDoctor,appointmentsDoctor,appointmentComplete,appointmentCancel,doctorDashboard,doctorProfile,updateDoctorProfile}