import React from 'react'
import './DoctorAppointments.css'
import { DoctorContext } from '../../../context/DoctorContext.jsx'
import { useContext } from 'react'
import { AppContext } from '../../../context/AppContext.jsx'
import { assets } from '../../../assets/assets.js'
import axios from 'axios'
import { toast } from 'react-toastify'


const DoctorAppointments = () => {

  const { appointments, backendUrl, dToken, doctorAppointments } = useContext(DoctorContext)
  const { calculateAge } = useContext(AppContext)


  const appointmentComplete = async (appointmentId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/doctor/appointmentComplete`, { appointmentId }, {
        headers: {
          Authorization: `Bearer ${dToken}`
        }
      })
      if (response.data.success) {
        toast.success(response.data.message || "Appointment Completed")
        doctorAppointments()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error")
    }
  }

  const appointmentCancel = async (appointmentId) => {
    try {
      console.log(appointmentId)
      const response = await axios.post(`${backendUrl}/api/doctor/appointmentCancel`, { appointmentId }, {
        headers: {
          Authorization: `Bearer ${dToken}`
        }
      })
      if (response.data.success) {
        toast.success(response.data.message || "Appointment Cancel")
        doctorAppointments()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error")
    }
  }


  return (
    <div className='doAp-container'>
      <h3>All Appointments</h3>
      <div className='doAp-header-container'>
        <div className='doAp-header'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        <div className='doAp-info'>
          {
            appointments.map((item, index) => (
              <div key={index} className='doAp-data'>
                <p>{index + 1}</p>
                <div style={{ display: "flex", alignItems: "center" }}><img className='patient-image' src={item.userData.image} alt="" /> <p>{item.userData.name}</p> </div>
                <p>{item.payment ? "Online" : "CASH"}</p>
                <p>{calculateAge(item.userData.dob) ? calculateAge(item.userData.dob) : ""}</p>
                <p>{item.slotDate}</p>
                <p>{item.docData.fees}</p>
                <div className='doAp-cancel-div'>

                 {!item.cancelled&&!item.isCompleted?<img
                    onClick={() => {
                      if (!item.cancelled) {
                        appointmentCancel(item._id);
                      }
                    }}
                    className='doAp-cancel'
                    src={assets.cancel_icon}
                    alt="cancel"
                  />:<>{!item.isCompleted?<h5 style={{color:"red"}}>Cancelled</h5>:""}</>}

                 {!item.isCompleted&&!item.cancelled?<img
                    onClick={() => {
                      if (!item.isCompleted) {
                        appointmentComplete(item._id);
                      }
                    }}
                    className='doAp-cancel'
                    src={assets.tick_icon}
                    alt="complete"
                  />:!item.cancelled?<h5 style={{color:"green"}}>Completed</h5>:""}

                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments