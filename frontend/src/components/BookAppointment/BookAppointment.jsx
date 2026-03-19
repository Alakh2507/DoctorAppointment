import React from 'react'
import './BookAppointment.css'
import { assets } from '../../assets/assets_frontend/assets.js'
import {useNavigate} from 'react-router-dom'

const BookAppointment = () => {
  
  const navigate=useNavigate()

  return (
    <div className='bookappointment'>
        <div className='rightbook'>
        <h1>Book Appointment <br/> With 100+ Trusted Doctors</h1>
        <button  onClick={()=>navigate("/login")} className='btnbook'>Create account</button>
        </div>
        <div className='leftbook'>
           <img src={assets.appointment_img} alt="" />
        </div>
    </div>
  )
}

export default BookAppointment