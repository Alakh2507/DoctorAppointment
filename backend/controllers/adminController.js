import doctorModel from '../models/doctorModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointment.js'
import userModel from '../models/userModel.js'
import cloudinary from '../config/cloudinary.js'


//API for all doctors delete
const allDoctorsDelete = async (req, res) => {
  try {
   const result =
      await cloudinary.api.delete_resources_by_prefix(
        "uploads/"
      );
      
    res.json({
      success: true,
      message: "All images deleted",
      result,
    });

  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      speciality,
      email,
      password,
      degree,
      experience,
      about,
      fees,
      line1,
      line2,
    } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image required" });
    }

    // ✅ Check required fields first
    if (
      !name ||
      !speciality ||
      !email ||
      !password ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !line1
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    // ✅ Validate email
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email" });
    }

    // ✅ Validate password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // ✅ Check doctor exists
    const existingDoctor = await doctorModel.findOne({ email });

    if (existingDoctor) {
      return res.status(409).json({
        success: false,
        message: "Doctor already exists",
      });
    }

    // ✅ Upload to Cloudinary AFTER validation
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString(
        "base64"
      )}`,
      {
        folder: "uploads",
      }
    );

    const image = result.secure_url;
    const public_id = result.public_id;

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new doctorModel({
      name,
      speciality,
      email,
      image,
      public_id,
      password: hashedPassword,
      degree,
      experience,
      about,
      fees: Number(fees),
      address: { line1, line2 },
      date: Date.now(),
    });

    await newDoctor.save();

    res.json({
      success: true,
      message: "Doctor added successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


//API for admin login
const longinAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            //generate JWT token for admin
            const atoken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" })
            return res.json({
                success: true, atoken, message: "Admin logged in successfully"
            })
        } else {
            return res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (err) {
        res.json({ success: false, message: "Error  admin logging in" })
    }
}


//API to get all doctors list form admin panel
const allDoctors=async(req,res)=>{
   try{
    const alldoctors = await doctorModel.find().select("-password");
       return res.json({success:true ,alldoctors})

   }catch(error){
     return res.status(500).json({success:false,Message:error.message})
   }
}

//api to get all appointment list 
const appointmentAdmin=async(req,res)=>{
    try{
        const appointments=await appointmentModel.find({});

        res.json({success:true,appointments})

    }catch(error){
        console.log(error.message)
        res.status(500).json({success:false,message:error.message})
    }
}

//api for cancel appointment
const cancelAppointmentAdmin = async (req, res) => {
  try {
    const { appointmentId, } = req.body;
    
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }
    // Mark appointment as cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true
    });

    // Release doctor's slot
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;

    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (time) => time !== slotTime
      );
    }

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.status(200).json({
      success: true,
      message: "Appointment cancelled"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



//api to get dashboard data for admin panel
 const adminDashboard=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({}).select("-password")
        const users=await userModel.find({}).select("-password")
        const appointments=await appointmentModel.find({})
        
        const dashData={
            doctors:doctors.length,
            users:users.length,
            appointments:appointments.length,
            latestAppointments:appointments.reverse().slice(0,5),
        }
        
        res.json({success:true,dashData})


    }catch(error){
        console.log(error.message)
        res.status(500).json({success:false,message:error.message})
    }
 }





export { addDoctor, longinAdmin,allDoctors,appointmentAdmin,cancelAppointmentAdmin,adminDashboard,allDoctorsDelete}
