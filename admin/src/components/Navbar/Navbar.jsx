import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets.js'
import{AdminContext} from '../../context/AdminContext.jsx'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext.jsx'

const Navbar = ({setSidebarTrue}) => {

  const {aToken,setAToken}=useContext(AdminContext)
  const {dToken,setDToken}=useContext(DoctorContext)  

  const logout=()=>{
    aToken&&setAToken('')
    aToken&&localStorage.removeItem("atoken")
  }

  const doctorlogout=()=>{
    dToken&&setDToken('')
    dToken&&localStorage.removeItem("dToken ")
  }


  return (
    <div className='navbar'>
        <div className='navbar-con'>
            <img src={assets.admin_logo} alt="" />
            <p>{aToken?"Admin":"Doctor"}</p>
        </div>
        <div className='nav-btn-container'>
        <button className='navbar-btn' onClick={ aToken?logout:doctorlogout}>Logout</button>
        <img onClick={()=>setSidebarTrue(prev=>!prev)}  className='nav-munu' src={assets.menu_icon} alt="" />
        </div>
    </div>
  )
}

export default Navbar