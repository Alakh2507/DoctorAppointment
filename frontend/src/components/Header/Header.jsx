import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets_frontend/assets'
const Header = () => {
    return (
        <div className='header'>
            {/* // right side */}
            <div className='header-left'>
              <p>Book Appointment <br /> with Trusted Doctors</p>
              <div className='header-left-con'>
                <img src={assets.group_profiles} alt="" />
                <p>Simply browse through our extensive list of trusted doctors, 
                    schedule your appointment hassle-free.</p>
              </div>
            <a href="#menupage"> <button className='header-btn'>Book appointment <img src={assets.arrow_icon} alt="" /></button></a>
            </div>

            {/* left side */}
            <div className='header-right'>
                <img src={assets.header_img} alt="" />
            </div>
        </div>
    )
}

export default Header