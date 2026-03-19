import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';


export const AdminContext = createContext()

const AdminContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [aToken, setAToken] = useState(localStorage.getItem("atoken") || "")
  const[doctors,setDoctors]=useState([])
  const[allAppointment,SetAllAppointment]=useState([])
  const[dashData,setDashData]=useState([]);

  const getAllDoctors = async () => {
    try {
      const response= await axios.get(`${backendUrl}/api/admin/all-doctors`, { headers: { Authorization: `Bearer ${aToken}` } })
      if(response.data.success){
        setDoctors(response.data.alldoctors)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message ||error.message);
    }
  }

  //change doctor availability
   const changeAvailabilitydoctor=async(docId)=>{
        try{ 
          const response=await axios.put(`${backendUrl}/api/admin/change-availability`,{docId},{headers:{Authorization:`Bearer ${aToken}`}})

           if(response.data.success){
             toast.success(response.data.message)
             getAllDoctors();
           }

       }catch(error){
            toast.error(error.response?.data?.message||"Something went wrong")
       }
   }
   
   //get all appointment
   const getAllAppointments=async()=>{
      try{
          const response=await axios.get(`${backendUrl}/api/admin//appointments`,{headers:{Authorization:`Bearer ${aToken}`}})
           if(response.data.success){
          SetAllAppointment(response.data.appointments.reverse());
           }else{
            toast.error(response.data.message)
           }
    }catch(error){
      toast.error(error.response?.data?.message||"Server error")
    }
   }


  //  cancel Appointment
  const cancelAppointmentAdmin=async(appointmentId)=>{
         try{
          const response=await axios.post(`${backendUrl}/api/admin/cancelAppointmentAdmin`,{appointmentId},{headers:{Authorization:`Bearer ${aToken}`}})
            if(response.data.success){
              toast.success(response.data.message)
              getAllAppointments()
            }
        }catch(error){
          console.error(error.message)
          toast.error(error.response?.data?.message||"Sever error")
         }
   }


   //getData Dashboard
   const getDashData=async()=>{
      try{
       const response=await axios.get(`${backendUrl}/api/admin/dashboard`,{headers:{Authorization:`Bearer ${aToken}`}})
       if(response.data.success){
        setDashData(response.data.dashData)
       }else{
        toast.error(response.data.message)
       }
      }catch(error){
        console(error.message)
        toast.error(error.response?.data?.message||error)

      }
   }
   useEffect(()=>{
      // getAllAppointments()
      // getDashData()
   },[])

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailabilitydoctor,
    allAppointment,
    getAllAppointments,
    dashData,
    getDashData,
    cancelAppointmentAdmin
  }

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider;

