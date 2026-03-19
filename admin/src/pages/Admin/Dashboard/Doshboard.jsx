import React, { useEffect } from 'react'
import './Dashboard.css'
import { assets } from '../../../assets/assets.js'
import { useContext } from 'react'
import { AdminContext } from '../../../context/AdminContext.jsx'


const Doshboard = () => {
    
  const{backendUrl ,aToken, dashData,getDashData,cancelAppointmentAdmin}=useContext(AdminContext)
   
  
  useEffect(()=>{
    if(aToken){
    getDashData();
    }
  },[aToken])
 
  return aToken&&(
    <div className='dashbord-container'>

    <div className='dabshord-data'>
     <div className='Datalength'><img src={assets.doctor_icon} alt="" /><p >{dashData.doctors}<span>Doctors</span></p> </div> 
     <div className='Datalength'><img src={assets.appointments_icon} alt="" /><p>{dashData.appointments}<span>Appointment</span></p></div>
     <div className='Datalength'><img src={assets.patients_icon} alt="" /><p>{dashData.users}<span>Patients</span></p></div>
    </div>

    {/* Latest Appointment */}
    <div className='latestApp-container'>
    <h3><img src={assets.list_icon} alt="" /> Latest Appointment</h3>
    <hr/>
     <div className='latestApp'>
      {
       dashData?.latestAppointments?.map((item,index)=>(
          <div key={index} className='dashbord-table-row'>
            <div className='dashboard-right dashrl' ><img src={`${backendUrl}/uploads/${item.docData.image}`} alt="doctors" /><div><p style={{color:"black" ,fontSize:"12px"}}>{item.docData.name}</p><p>booking on  {item.slotDate} </p></div></div>
            <div className='dashboard-left' >{item.cancelled?(<span style={{color:"red"}}>Appointment cancelled</span>):(<img onClick={()=>cancelAppointmentAdmin(item._id)} src={assets.cancel_icon} alt="" />)}</div>
          </div>
        ))
      }
     </div>
    </div>
    </div>
  )
}

export default Doshboard