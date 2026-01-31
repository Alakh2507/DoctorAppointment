import React from 'react'
import './About.css'
import { assets } from '../../assets/assets_frontend/assets.js'
const About = () => {
  return (
    <div className='about'>
      <h2>About Us</h2>
      <div className='about-first' >
        <img src={assets.about_image} alt="" />
        <div className='about-info'>
          <h2></h2>
          <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
            <br /><br />
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
            <br />
            <h5>Our Vision</h5>
            <br />
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>
      <div className='whychoose'>
        <h2>Why Choose Us</h2>
        <div className='whychoose-info'>
         <div className='whychoose-info1'>
           <h5>Efficiency:</h5>
           <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
         </div>
         <hr />
         <div className='whychoose-info1'>
         <h5>Convenience:</h5>
         <p>Access to a network of trusted healthcare professionals in your area.</p>
         </div>
           <hr />
         <div className='whychoose-info1'>
          <h5>Personalization:</h5>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
         </div>

        </div>
      </div>
    </div>
  )
}

export default About