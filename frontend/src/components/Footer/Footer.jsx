import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets_frontend/assets'
const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-container'>
        <div className='footer-left'>
          <img src={assets.logo} alt="" />
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        <div className='footer-right'>
          <div className='footer-right-1'>
            <h3>COMPANY</h3>
            <p>Home</p>
            <p>About us</p>
            <p>Contact us</p>
            <p>Privacy policy</p>
          </div>
          <div className='footer-right-2'>
            <h3>GET IN TOUCH</h3>
            <p>+91-953-249-4221</p>
            <p>alakh.kushwaha1@gmail.com</p>
          </div>

        </div>

      </div>
      <hr  />
      <p className='copyright'>Copyright © 2026 Alakh -All Right Reserved </p>
    </div>
  )
}

export default Footer