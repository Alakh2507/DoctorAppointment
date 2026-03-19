import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointment.js'


//api for gegisterUser
const registerUser = async (req, res) => {

  const { name, email, password } = req.body;


  try {
    //empty check
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing details" })
    }

    //validating email formate
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" })
    }
    //validating password length
    if (!validator.isLength(password, { min: 8 })) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" })
    }
    //checking is user already exists
    const exists = await userModel.findOne({ email })
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exist Please login" })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await userModel.create({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    })

    const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
    return res.status(201).json({ success: true, userToken, message: "Created account successfully" })


  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}


//api for login user


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check empty fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing Details" })
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" })
    }

    // Check user
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(401).json({ success: false, message: "User does not exist" })
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" })
    }

    // Generate token
    const userToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    return res.status(200).json({
      success: true,
      userToken,
      message: "Login successful"
    })


  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ success: false, message: error.message })
  }
}


//api for getuser profile data
const getProfile = async (req, res) => {
  try {
    const userId = req.user//  get from token middleware
    const userData = await userModel.findById(userId).select('-password');
    res.status(200).json({ success: true, userData })

  } catch (error) {
    console.error(error.message)
    res.status(500).json({ success: false, message: error.message })
  }
}

//api for update user info
const updateUserInfo = async (req, res) => {
  try {

    const userId = req.user //  get from token middleware
  
    const { name, phone, line1, line2, gender, dob } = req.body;
    const image = req.file?.filename;

    const updateData = {
      name,
      phone,
      gender,
      dob,
      address: {
        line1,
        line2
      }
    };

    if (image) {
      updateData.image = image;
    }
  
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    if (updateData) {
      res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
        userData: updatedUser
      });
    }

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
    const userId = req.user;

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    if (!docData.available) {
      return res.status(400).json({
        success: false,
        message: "Doctor not available",
      });
    }

    // Clone slots object
    let slots_booked = { ...docData.slots_booked };

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.status(409).json({
          success: false,
          message: "Slot already booked",
        });
      }
      slots_booked[slotDate].push(slotTime);
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    const userData = await userModel.findById(userId).select("-password");

    const doctorInfo = docData.toObject();
    delete doctorInfo.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData: doctorInfo,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    await appointmentModel.create(appointmentData);

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//api for get user appointment

const getAppointment = async (req, res) => {
  try {
    const userId = req.user//get userId from middleware
    const appoData = await appointmentModel.find({ userId })

    res.status(200).json({ success: true, appoData, message: "Appointments fetched successfully" })


  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}



//api for cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.user;//get userId from middleware
    if(!userId){
     return res.json({success:false,message:"Your token expired,Please login again."})
    }

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    // Verify appointment belongs to user
    if (appointmentData.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access"
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



export { registerUser, loginUser, getProfile, updateUserInfo, bookAppointment, getAppointment,cancelAppointment }

