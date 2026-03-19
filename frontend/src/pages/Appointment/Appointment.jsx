import React, { useEffect, useState, useContext } from 'react'
import './Appointment.css'
import { StoreContext } from '../../context/StoreContext.jsx'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets_frontend/assets.js'
import RelatedDoctors from '../../components/RelatedDoctors/RelatedDoctors.jsx'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { doctors,backendUrl,token} = useContext(StoreContext)
  const { docId } = useParams()

  const [data, setData] = useState({})
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  // console.log(slotTime)

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const fetchDocInfo = () => {
    const doctor = doctors.find(doc => doc._id === docId)
    setData(doctor || {})
  }
  
  // console.log(docSlots)
  const getAvailableSlots = () => {
    setDocSlots([])

    //getting current date
    let today =new Date();    

    for(let i=0;i<7;i++){

      //getting date with index
      let currentDate=new Date(today)
       currentDate.setDate(today.getDate()+i)
         //next seven day today.getDate() = 1
        //  console.log(currentDate.getDate())

       //setting end time of the date with index
       let endTime=new Date()
       endTime.setDate(today.getDate()+i)
      //  console.log(endTime.toDateString())
       endTime.setHours(21,0,0,0)
      //  console.log(endTime.getMinutes())
      
       // setting hours
       if(today.getDate()===currentDate.getDate()){
            currentDate.setHours(currentDate.getHours()>10?currentDate.getHours()+1:10)
            currentDate.setMinutes(currentDate.getMinutes()>30?30:0)
       }else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
       }
      // console.log(currentDate)
      // console.log(endTime)
       let timeSlots=[]
       while(currentDate<endTime){
        let formattedTime=currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
        // console.log(formattedTime)
        //add slot to array
        timeSlots.push({
          datetime:new Date(currentDate),
          time:formattedTime
        })
        //Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes()+30)
       }
       setDocSlots(prev=>([...prev,timeSlots]))
    }
  }
  

  //bookAppointment 
  const bookAppointment=async()=>{
  
    if (!token) {
      return toast.error("Please login first")
    }

    if (!slotTime) {
      return toast.error("Please select time slot")
    }

    try{
      const date=docSlots[slotIndex][0].datetime
      let day=date.getDate()
      let month=date.getMonth()+1
      let years=date.getFullYear()

      const slotDate=day+"-"+month+"-"+years;
      console.log(slotDate, slotTime)
  
      const response=await axios.post(`${backendUrl}/api/user/bookAppointment`,{slotDate,slotTime,docId},{headers:{Authorization:`Bearer ${token}`}} )
      
      if(response.data.success){
        toast.success(response.data.message)
      }

    }catch(error){
      toast.error(error.response?.data?.message||"Server error")
    }
  }


  useEffect(() => {
    fetchDocInfo()
    getAvailableSlots()
    
  }, [doctors, docId])

  return (
    <div className='appointment'>
      <div className='appointment-container'>
        <img src={`${backendUrl}/uploads/${data.image}`} alt="" />

        <div className='appointment-left-container'>
          <div className='appointment-top'>
            <h2>{data.name}</h2>
            <p>{data.degree} {data.speciality}</p>
            <p>{data.experience}</p>

            <h5>About <img src={assets.info_icon} alt="" /></h5>
            <p>{data.about}</p>
            <p>Appointment fees ₹{data.fees}</p>
          </div>

         {/* ........book slots ......... */}
         <div className='appointment-bottom'>
          <h4>Booking slots</h4>
          <div className='appo-bottom-container'>
            {
              docSlots.length && docSlots.map((item ,index)=>(
                <div className={`appo-bottom-info ${index === slotIndex ? "active1" : ""}`} onClick={()=>setSlotIndex(index)} key={index}>
                  <p>{item[0]&&daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0]&&item[0].datetime.getDate()}</p>
                </div> 
              ))
            }
          </div>

          <div className='appo-bottom-time'>
            {
              docSlots.length && docSlots[slotIndex].map((item,index)=>(
                <p className={slotTime === item.time ? " active1" : ""} onClick={()=>setSlotTime(item.time)} key={index}>{item.time.toLowerCase()}</p>
              ))
            }
          </div>
          <button className='btn-book' onClick={bookAppointment}>Book an appointment</button>
          
         </div>
        </div>   
      </div>
       {/* ..........Related Doctors */}
       <RelatedDoctors docId={docId} speciality={data.speciality}/>
    </div>
  )
}

export default Appointment
