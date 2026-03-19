import express from 'express'
import { registerUser,loginUser,getProfile,updateUserInfo,bookAppointment,getAppointment,cancelAppointment} from '../controllers/userController.js'
import authUser from '../middleware/authUser.js'
import upload from '../middleware/upload.js'

const userRouter=express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/userprofile",authUser,getProfile)
userRouter.post("/editprofile",authUser,upload.single("image"),updateUserInfo)
userRouter.post("/bookAppointment",authUser,bookAppointment)
userRouter.get("/getAppointment",authUser,getAppointment)
userRouter.post("/cancelAppointment",authUser,cancelAppointment)
export default userRouter