import Stripe from "stripe"
import appointmentModel from "../models/appointment.js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const stripePayment = async (req, res) => {
  try {

    const { appointmentId } = req.body

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID required"
      })
    }

    const appointment = await appointmentModel.findById(appointmentId)

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      })
    }

    const line_items = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `Appointment with ${appointment.docData.name}`
          },
          unit_amount: appointment.amount * 100, // convert ₹ to paisa
        },
        quantity: 1,
      },
    ]

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/verify?success=true&appointmentId=${appointmentId}`,
      cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&appointmentId=${appointmentId}`,
    })

    res.status(200).json({
      success: true,
      url: session.url
    })

  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// verify payment
const verifyPayment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.user.id;

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID is required"
      });
    }

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    // Verify appointment belongs to user
    if (appointment.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access"
      });
    }

    // Update payment status
    appointment.payment = true;
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



export { stripePayment,verifyPayment }
