import express from 'express'
import authUser from '../middleware/authUser.js'
import{stripePayment,verifyPayment} from '../controllers/paymentController.js'


const paymentRouter=express.Router()

paymentRouter.post("/stripe-payment",authUser,stripePayment)
paymentRouter.post("/verifyPayment",authUser,verifyPayment)
export default paymentRouter;