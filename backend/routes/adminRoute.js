import express from "express";
import { addDoctor,allDoctors,longinAdmin,appointmentAdmin,cancelAppointmentAdmin,adminDashboard,allDoctorsDelete } from "../controllers/adminController.js";
import upload from "../middleware/upload.js";  
import authAdmin from "../middleware/authAdmin.js"; 
import { changeAvailablity } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post("/login", longinAdmin);
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.get("/all-doctors", authAdmin,allDoctors)
adminRouter.put("/change-availability",authAdmin,changeAvailablity)
adminRouter.get("/appointments",authAdmin,appointmentAdmin,)
adminRouter.post("/cancelAppointmentAdmin",authAdmin,authAdmin,cancelAppointmentAdmin)
adminRouter.get("/dashboard",authAdmin,adminDashboard)
adminRouter.delete("/all-doctors-delete",allDoctorsDelete)
export default adminRouter;
