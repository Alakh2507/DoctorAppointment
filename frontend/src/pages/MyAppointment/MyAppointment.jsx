import React, { useEffect, useState } from 'react'
import './MyAppointment.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'


const MyAppointment = () => {

  const { backendUrl, token, } = useContext(StoreContext)
  const [data, setData] = useState([])
// const location = useLocation();
  //for month 
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const dateArray = (slotDate) => {
    const parts = slotDate.split("-")
    return parts[0] + "-" + months[parseInt(parts[1]) - 1] + "-" + parts[2]

  }


  // get appointment data
  const appointmentData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/getAppointment`, { headers: { Authorization: `Bearer ${token}` } })
      if (response.data.success) {
        setData(response.data.appoData)
        console.log(response.data.appoData)

      }
    } catch (error) {
      toast.error(error.response?.data?.message)
    }

  }

  //cencell appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const cancelResponse = await axios.post(`${backendUrl}/api/user/cancelAppointment`, { appointmentId }, { headers: { Authorization: `Bearer ${token}` } })
      if (cancelResponse.data.success) {
        toast.success(cancelResponse.data.message)
        appointmentData();//refresh appointments
      }

    } catch (error) {
      console.log(error.message)
      toast.error(error.response?.data?.message || "Server error")
    }
  }


 // payment
const payNow = async (appointmentId) => {

  console.log(appointmentId)
  try {
    const response = await axios.post(
      `${backendUrl}/api/userpayment/stripe-payment`,
      { appointmentId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.data.success) {
      window.location.href = response.data.url; // Redirect to Stripe Checkout
    }

  } catch (error) {
    console.log(error.message);
    toast.error(error.response?.data?.message || "Payment failed");
  }
};




  useEffect(() => {
    if (token) {
      appointmentData()
    }
  }, [token])




  return (
    <div className='myAppoint-container'>
      <h3>My Appointments</h3>
      <div className='myAppoint-list'>
        {data.map((item, index) => {
          return (<div key={index}>
            <hr style={{ border: "1px solid #EAEFFF", margin: "10px 0" }} />
            <div className='myAppoint-item'>
              <div className='myAppoint-cart'>
                <img src={item.docData.image} alt="" />
                <div className='myAppoint-info'>
                  <h4 >{item.docData.name}</h4>
                  <p> <span> {item.docData.speciality}</span></p>
                  <p>Address:  <span> {item.docData.address.line1 + " " + item.docData.address.line2}</span></p>
                  <p>Date & Time: <span style={{ color: "green" }}>{dateArray(item.slotDate) + " , " + item.slotTime}</span></p>
                </div>
              </div>

              <div className='btn-Pay'>
                {
                  <button style={item.payment?{background:"white"}:{}}  className='btn-cancel' onClick={()=> !item.cancelled&&!item.payment&&(payNow(item._id))} >{!item.payment?"Pay Online":(<span style={{color:"green",}}>Pyment successfull</span>)}</button>}
                 <button onClick={() => !item.cancelled&&!item.payment&&(cancelAppointment(item._id))} className='btn-cancel active'>{!item.cancelled?"Cancel appointment":(<span style={{color:"red",padding:"0px",margin:"0px"}}>Appointment cancelled</span>)}</button>
              </div>
            </div>

          </div>)
        })}
      </div>
      <hr style={{ border: "1px solid #EAEFFF", margin: "10px 0" }} />
    </div>
  )
}

export default MyAppointment