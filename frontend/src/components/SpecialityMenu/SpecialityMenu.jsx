import React from 'react'
import './SpecialityMenu.css'
import { specialityData } from '../../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'
const SpecialityMenu = () => {
  return (
    <div className='menu'id='menupage'>
    <h1>Find by Speciality</h1>
    <p>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
     {/* <div className='specialitymenu'>
           {
            specialityData.map((item,index)=>{
                return(
                  <Link onClick={()=>scrollTo(0,0)} key={index} to={`/doctors/${item.speciality}`}>
                    <img src={item.image} alt="" />
                    <p>{item.speciality}</p>
                  </Link>
                )
            })
           }
     </div> */}
    </div>
  )
}

export default SpecialityMenu