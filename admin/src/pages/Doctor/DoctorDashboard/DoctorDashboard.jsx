import React, { useEffect } from 'react'
import './DoctorDashboard.css'
import { assets } from '../../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { DoctorContext } from '../../../context/DoctorContext.jsx'
import { AppContext } from '../../../context/AppContext.jsx'

const DoctorDashboard = () => {

  const { dashData, backendUrl, dToken, getdashData } = useContext(DoctorContext)

  //appointment canceled
  const appointmentCancel = async (appointmentId) => {
    try {
      console.log(appointmentId)
      const response = await axios.post(`${backendUrl}/api/doctor/appointmentCancel`, { appointmentId }, {
        headers: {
          Authorization: `Bearer ${dToken}`
        }
      })
      if (response.data.success) {
        toast.success(response.data.message || "Appointment Cancel")
        getdashData()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  //appointment completed

  const appointmentComplete = async (appointmentId) => {
    try {
      console.log(appointmentId)
      const response = await axios.post(`${backendUrl}/api/doctor/appointmentComplete`, { appointmentId }, {
        headers: {
          Authorization: `Bearer ${dToken}`
        }
      })
      if (response.data.success) {
        toast.success(response.data.message || "Appointment Completed")
        getdashData()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error")
    }
  }


  useEffect(() => {
    if (dToken) {
      getdashData()
    }
  }, [dToken])



  return (
    <div className='dashbord-container'>

      <div className='dabshord-data'>
        <div className='Datalength'><img src={assets.earning_icon} alt="" /><p ><span>Earning</span>{dashData.earnings}</p> </div>
        <div className='Datalength'><img src={assets.appointments_icon} alt="" /><p><span>Appointment</span>{dashData.appointments}</p></div>
        <div className='Datalength'><img src={assets.patients_icon} alt="" /><p><span>Patients</span>{dashData.patients}</p></div>
      </div>

      {/* Latest Appointment */}
      <div className='latestApp-container'>
        <h3><img src={assets.list_icon} alt="" /> Latest Appointment</h3>
        <hr />
        <div className='latestApp'>
          {
            dashData?.latestAppointments?.map((item, index) => (
              <div key={index} className='dashbord-table-row'>
                <div className='dashboard-right dashrl' ><img src={`${backendUrl}/uploads/${item.docData.image}`} alt="doctors" /><div><p style={{ color: "black", fontSize: "12px" }}>{item.docData.name}</p><p>booking on  {item.slotDate} </p></div></div>
                <div className='dashboard-left' >
                  {!item.cancelled && !item.isCompleted ? <img
                    onClick={() => {
                      if (!item.cancelled) {
                        appointmentCancel(item._id);
                      }
                    }}
                    className='doAp-cancel'
                    src={assets.cancel_icon}
                    alt="cancel"
                  /> : <>{!item.isCompleted ? <h5 style={{ color: "red" }}>Cancelled</h5> : ""}</>}

                  {!item.isCompleted && !item.cancelled ? <img
                    onClick={() => {
                      if (!item.isCompleted) {
                        appointmentComplete(item._id);
                      }
                    }}
                    className='doAp-cancel'
                    src={assets.tick_icon}
                    alt="complete"
                  /> : !item.cancelled ? <h5 style={{ color: "green" }}>Completed</h5> : ""}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard