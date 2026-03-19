import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRouter.js'
import paymentRouter from './routes/paymentRoute.js'
//app config
const app=express()
const port=process.env.PORT ||4000

//db connection
connectDB()

//middlewares
app.use(cors())
app.use(express.json())

// uploaded files publicly accessible in the browser.
app.use("/uploads", express.static("uploads"));

//api endpoints
//adminRouter
app.use("/api/admin", adminRouter);
app.use("/api/doctor",doctorRouter)

//userRouter
app.use("/api/user" , userRouter)

//paymentRouter
app.use("/api/userpayment",paymentRouter)


app.get("/",(req,res)=>{
    res.send(`Server is running on port ${port}`)
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
