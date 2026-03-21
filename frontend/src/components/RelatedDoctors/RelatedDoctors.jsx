import React, { useEffect, useState } from 'react'
import './RelatedDoctors.css'
import { StoreContext } from '../../context/StoreContext.jsx'
import { useContext } from 'react'
import {useNavigate} from 'react-router-dom'

const RelatedDoctors = ({docId,speciality}) => {
  
  const navigate=useNavigate()

   const {doctors,backendUrl}=useContext(StoreContext)

   const [relatedDoc,setRelatedDoc]=useState([])

   const findRelatedDoctor=()=>{
      const doctor=doctors.filter((doc)=> doc.speciality&& speciality&& doc.speciality.toLowerCase()===speciality.toLowerCase() && doc._id!==docId)
      setRelatedDoc(doctor);
   }
   
   useEffect(()=>{
    findRelatedDoctor();
   },[docId,speciality])

  return (
    <div className='relatedDoc-con'>
        <h2>Related Doctors</h2>
        <p>Simply browse through our extensive list of trusted doctors.</p>
          <div className='relatedDoc'>
          {
            relatedDoc.map((item,index)=>(
                <div onClick={()=>navigate(`/appointment/${item._id}`)} className='relatedDoccart'  key={index}>
                   <img src={item.image} alt="" />
                    <div className='relatedDocCart-info'>
                        <p style={{color:"#0FBF00", fontSize:"12px" }}>available</p>
                        <p style={{color:"black", fontWeight:"550"}}>{item.name}</p>
                        <p>{item.speciality+"  "+ "  ,"+" exp:"+item.experience}</p>
                    </div>
                </div>
            ) 
            )
          }
          </div>
    </div>
  )
}

export default RelatedDoctors