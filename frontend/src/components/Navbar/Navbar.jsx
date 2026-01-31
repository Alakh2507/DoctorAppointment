import React from 'react'
import './Navbar.css'
import{useState,useContext} from 'react'
import {assets} from '../../assets/assets_frontend/assets.js'
import { StoreContext } from '../../context/StoreContext.jsx'
import{useNavigate,NavLink} from 'react-router-dom'

const Navbar = () => {

  const {token}=useContext(StoreContext)
   console.log(token);
  const[menu, setMenu]=useState("home")

  const navigate=useNavigate();


  return (
    <div className='navbar'>
      <div className='navbar-1'>
        <img  onClick={()=>navigate("/")} src={assets.logo} alt="" />
       <ul>
       <NavLink to={"/"}> <li >HOME</li></NavLink>
         <NavLink to={"/doctors"}><li >ALL DOCTORS</li></NavLink>
        <NavLink to={"/about"}><li >ABOUT</li></NavLink> 
        <NavLink to={"/contact"}><li >CONTACT</li></NavLink> 
       </ul>
       <div className=''>
        { token? <div className='create'>
          <img src={assets.profile_pic} alt="" />
          <img  src={assets.dropdown_icon} alt="" />
          <div className='my-app-container'>
             <div className='my-appointment'>            
            <p onClick={()=>navigate("/myprofile")}>My Profile</p>
            <p onClick={()=>navigate("/myappointment")}>My Appointments</p>
            <p>Logout</p>
            </div>
            </div>
          </div>

           : <button onClick={()=>navigate("/login")} className='nav-btn'>Create account</button>
       }
       </div>
      </div>
       <hr/>
    </div>
  )
}

export default Navbar