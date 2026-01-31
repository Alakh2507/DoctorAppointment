import React from 'react'
import './Contact.css'
import { assets } from '../../assets/assets_frontend/assets'
const Contact = () => {
  return (
    <div className='contactus'>
      <h2>CONTACT Us</h2>
      <div className='contactus-container'>
        <div className='contactus-img'>
          <img src={assets.contact_image} alt="" />
        </div>
        <div className='contactus-info'>
          <h4>Our OFFICE</h4>
          <p>54709 Willms Station <br />
            Suite 350, Washington, USA</p>
          <br />

          <p>Tel:91-9532494221</p>
          <p>Email:alakh.kushwaha1@gamil.com</p>
          <br />
          <h4>Careers at PRESCRIPTO</h4>
          <p>Learn more about our teams and job openings.</p>

          <button className='btn-contact'>Explore Jobs</button>
        </div>
      </div>

    </div>
  )
}

export default Contact