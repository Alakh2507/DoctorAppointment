import React, { useEffect, useState, useContext } from 'react'
import './Appointment.css'
import { StoreContext } from '../../context/StoreContext.jsx'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets_frontend/assets.js'

const Appointment = () => {
  const { doctors } = useContext(StoreContext)
  const { docId } = useParams()

  const [data, setData] = useState({})
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const fetchDocInfo = () => {
    const doctor = doctors.find(doc => doc._id === docId)
    setData(doctor || {})
  }

  const getAvailableSlots = () => {
    let slots = []
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (i === 0) {
        let now = new Date()
        now.setMinutes(now.getMinutes() + (30 - now.getMinutes() % 30))
        now.setSeconds(0)

        if (now.getHours() < 10) {
          currentDate.setHours(10, 0, 0, 0)
        } else {
          currentDate = new Date(now)
        }
      } else {
        currentDate.setHours(10, 0, 0, 0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        timeSlots.push({
          datetime: new Date(currentDate),
          time: currentDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      slots.push(timeSlots)
    }

    setDocSlots(slots)
  }

  useEffect(() => {
    fetchDocInfo()
    getAvailableSlots()
  }, [doctors, docId])

  return (
    <div className='appointment'>
      <div className='appointment-top'>
        <img src={data.image} alt="" />

        <div>
          <h2>{data.name}</h2>
          <p>{data.degree} {data.speciality}</p>
          <p>{data.experience}</p>

          <h5>About <img src={assets.info_icon} alt="" /></h5>
          <p>{data.about}</p>
          <p>Appointment fees ₹{data.fees}</p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='booking-slots'>
        <h4>Booking Slots</h4>

        {/* Days */}
        <div className='slots-days'>
          {docSlots.map((daySlots, index) => {
            const date = daySlots[0]?.datetime
            return (
              <div
                key={index}
                className={`day-card ${slotIndex === index ? "active" : ""}`}
                onClick={() => setSlotIndex(index)}
              >
                <p>{date ? daysOfWeek[date.getDay()] : ""}</p>
                <p>{date ? date.getDate() : ""}</p>
              </div>
            )
          })}
        </div>

        {/* Time Slots */}
        <div className='slots-time'>
          {docSlots[slotIndex]?.map((slot, index) => (
            <p
              key={index}
              className={`time-slot ${slot.time === slotTime ? "active" : ""}`}
              onClick={() => setSlotTime(slot.time)}
            >
              {slot.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button className='book-btn'>Book an appointment</button>
      </div>
    </div>
  )
}

export default Appointment
