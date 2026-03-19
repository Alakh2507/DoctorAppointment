import React, { createContext, use, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const navigate=useNavigate()    

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(false);
    const [dToken, setDToken] = useState(localStorage.getItem("dtoken") || "")
    const [appointments, setAppointments] = useState([]);
    const [dashData,setDashData]=useState([])

    const [profileData,setProfileData]=useState(
    {
    name:'',
    speciality:'',
    experience:'',
    about:'', 
    available:'',
    address:{
        line1:'',
        line2:''
    },
   })
    
   useEffect(()=>{
    if(dToken){
        navigate("/doctor-dashboard")
    }
},[dToken])
 
    //get doctorAppointments
    const doctorAppointments = async () => {
              
        if(!dToken){
            return;
        }

         setLoading(true)
        try {
            const resposne = await axios.get(`${backendUrl}/api/doctor/appointment`, { headers: { Authorization: `Bearer ${dToken}` } })
            if (resposne.data.success) {
                setAppointments(resposne.data.appointments)
                // console.log(resposne.data.appointments)
            }

        } catch (error) {
            console.error(error)
            toast.error(error.resposne?.data?.message || "Server error")
        }finally{
            setLoading(false);
        }
    }

    // dashboard Data
   const getdashData=async()=>{
       try{
        const response=await axios.get(`${backendUrl}/api/doctor/doctorDashboard`,{headers:{Authorization:`Bearer ${dToken}`}})
            if(response.data.success){
                setDashData(response.data.dashData)
                // console.log(response.data.dashData)
            }
       }catch(error){
        console.error(error)
        toast.error(error.response?.data?.message||"Sever error")
       }
    }

    //getprofile data
    const getProfileData=async()=>{
        try{
            const response=await axios.get(`${backendUrl}/api/doctor/doctorProfile`,{headers:{Authorization:`Bearer ${dToken}`}})
            if(response.data.success){
                setProfileData(response.data.doctor)
                console.log(response.data.doctor);
            }
        }catch(error){
            console.error(error);
            toast.error(error.response?.data?.message||"Server error")
        }
    }
  

    useEffect(() => {
        if (dToken) {
            doctorAppointments()
        }
    },[dToken,backendUrl])



    const value = {
        backendUrl,
        dToken,
        setDToken,
        appointments,
        loading,
        doctorAppointments,
        dashData,
        getdashData,
        profileData,
        getProfileData,
        setProfileData,
    }


    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;
