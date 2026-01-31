import React, { useContext, useEffect, useState } from 'react'
import './Doctors.css'
import { useParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext.jsx'
import { useNavigate } from 'react-router-dom'

const Doctors = () => {
  const navigate = useNavigate();

  const { doctors } = useContext(StoreContext)
  const { speciality } = useParams();// gets value from URL
  const [filterDoc, setFilterDoc] = useState([])

  const applyFilter = () => {

    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality])

  return (
    <div className="doctors-page">
      <p className="doctors-title">Browse through the doctors specialist.</p>

      <div className="doctors-container">

        {/* Speciality Sidebar */}
        <div className="speciality-list">
          <p
            onClick={() => speciality === "General physician" ? navigate("/doctors") : navigate("/doctors/General physician")}
            className={speciality === "General physician" ? "styleapply" : ""}
          >
            General physician
          </p>

          <p
            onClick={() => speciality === "Gynecologist" ? navigate("/doctors") : navigate("/doctors/Gynecologist")}
            className={speciality === "Gynecologist" ? "styleapply" : ""}
          >
            Gynecologist
          </p>

          <p
            onClick={() => speciality === "Dermatologist" ? navigate("/doctors") : navigate("/doctors/Dermatologist")}
            className={speciality === "Dermatologist" ? "styleapply" : ""}
          >
            Dermatologist
          </p>

          <p
            onClick={() => speciality === "Pediatricians" ? navigate("/doctors") : navigate("/doctors/Pediatricians")}
            className={speciality === "Pediatricians" ? "styleapply" : ""}
          >
            Pediatricians
          </p>

          <p
            onClick={() => speciality === "Neurologist" ? navigate("/doctors") : navigate("/doctors/Neurologist")}
            className={speciality === "Neurologist" ? "styleapply" : ""}
          >
            Neurologist
          </p>

          <p
            onClick={() => speciality === "Gastroenterologist" ? navigate("/doctors") : navigate("/doctors/Gastroenterologist")}
            className={speciality === "Gastroenterologist" ? "styleapply" : ""}
          >
            Gastroenterologist
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="doctors-grid">
          {filterDoc.map((item, index) => (
            <div
              className="doctor-card"
              onClick={() => navigate(`appointment/${item._id}`)}
              key={index}
            >
              <img className="doctor-image" src={item.image} alt={item.name} />

              <div className="doctor-info">
                <div className="availability">
                  <span className="available-dot"></span>
                  <p>Available</p>
                </div>

                <p className="doctor-name">{item.name}</p>
                <p className="doctor-speciality">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )

}

export default Doctors