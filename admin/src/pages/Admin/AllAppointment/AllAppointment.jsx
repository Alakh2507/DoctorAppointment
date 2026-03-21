import React, { useContext, useEffect } from 'react'
import './AllAppointment.css'
import { AdminContext } from '../../../context/AdminContext.jsx'
import {assets} from '../../../assets/assets.js'
import { AppContext } from '../../../context/AppContext.jsx'
const AllAppointment = () => {

  const { aToken, allAppointment, getAllAppointments,backendUrl,cancelAppointmentAdmin } = useContext(AdminContext)
  const {calculateAge }=useContext(AppContext)
 
  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }

  }, [aToken])
  console.log(allAppointment)
  return (
    <div className='all-appointments'>
      <h3>All Appointments</h3>

      <div className='appointment-table'>

        {/* Table Header */}
        <div className='table-header'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
          <p>Payment</p>
        </div>

        {/* Table Body */}
        {
          allAppointment && allAppointment.map((item, index) => (
            <div className='table-row' key={item._id}>
              <p>{index + 1}</p>
              <p className='imgPtag'> <img  src={item.userData.image} alt="" />{item.userData.name}</p>
              <p>{calculateAge(item.userData.dob)?calculateAge(item.userData.dob):"NA"}</p>
              <p>{item.slotDate} | {item.slotTime}</p>
              <p className='cancel-image '><img src={item.docData.image} lt="" />{item.docData.name}</p>
              <p>₹{item.amount}</p>
              <p>
                {
                  item.cancelled?(<span style={{color:"red"}}>Appointment cancelled</span>):<img style={{width:"35px",height:"35"}} onClick={()=>cancelAppointmentAdmin(item._id)} src={assets.cancel_icon} alt="" />
                }
              </p>
              <p>{item.payment?<span style={{color:"green"}}>paid</span>:<span style={{color:"#f59e0b"}}>pending</span>}</p>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default AllAppointment
