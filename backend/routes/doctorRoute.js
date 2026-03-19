import express from 'express'
import { DoctorsList,loginDoctor,appointmentsDoctor,appointmentComplete,appointmentCancel,doctorDashboard,doctorProfile,updateDoctorProfile} from '../controllers/doctorController.js';
import authDoctor from '../middleware/authDoctor.js';
import upload from '../middleware/upload.js'

 const doctorRouter=express.Router();

doctorRouter.get("/list",DoctorsList)
doctorRouter.post("/login",loginDoctor)
doctorRouter.get("/appointment",authDoctor,appointmentsDoctor)
doctorRouter.post("/appointmentComplete",authDoctor,appointmentComplete)
doctorRouter.post("/appointmentCancel",authDoctor,appointmentCancel)
doctorRouter.get("/doctorDashboard",authDoctor,doctorDashboard)
doctorRouter.get("/doctorProfile",authDoctor,doctorProfile)
doctorRouter.post("/updateDoctorProfile",authDoctor,upload.single("image"),updateDoctorProfile)
export default doctorRouter