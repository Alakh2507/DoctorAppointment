import React, { useContext } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../../context/DoctorContext'
const Sidebar = ({ sidebarTrue, setSidebarTrue }) => {

  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)

  const logout = () => {
    if (aToken) {
      aToken && setAToken('')
      aToken && localStorage.removeItem("atoken")
    }

    if (dToken) {
      dToken && setDToken('')
      dToken && localStorage.removeItem("dtoken")
    }
  }

  return (
    <>
      {/* Overlay */}
      {/* {sidebarTrue && (
        <div 
          className="overlay"
          onClick={() => setSidebarTrue(false)}
        ></div>
      )} */}


      {/* admin sidebar*/}

      {aToken && (<div className={`${sidebarTrue ? "sidebar sidebar-open" : "sidebar"}`}>
        <ul>
          <li>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                isActive ? "sidebar-navlink active" : "sidebar-navlink"
              }
              onClick={() => setSidebarTrue(false)}
            >
              <img src={assets.home_icon} alt="" />
              <p>Dashboard</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/all-appoints"
              className={({ isActive }) =>
                isActive ? "sidebar-navlink active" : "sidebar-navlink"
              }
              onClick={() => setSidebarTrue(false)}
            >
              <img src={assets.appointment_icon} alt="" />
              <p>Appointments</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                isActive ? "sidebar-navlink active" : "sidebar-navlink"
              }
              onClick={() => setSidebarTrue(false)}
            >
              <img src={assets.add_icon} alt="" />
              <p>Add Doctor</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/add-list"
              className={({ isActive }) =>
                isActive ? "sidebar-navlink active" : "sidebar-navlink"
              }
              onClick={() => setSidebarTrue(false)}
            >
              <img src={assets.doctor_icon} alt="" />
              <p>Doctor List</p>
            </NavLink>
          </li>
        </ul>
        <button onClick={logout} className='logout-btn'>Logout</button>
      </div>
      )}



      {/* doctor sidebar */}
      {dToken && (<div className={`${sidebarTrue ? "sidebar sidebar-open" : "sidebar"}`}>
        <ul>
          <li>
            <NavLink
              to="/doctor-dashboard"
              className={({ isActive }) =>
                isActive ? "sidebar-navlink active" : "sidebar-navlink"
              }
              onClick={() => setSidebarTrue(false)}
            >
              <img src={assets.home_icon} alt="" />
              <p>Dashboard</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/doctor-appointments"
              className={({ isActive }) =>
                isActive ? "sidebar-navlink active" : "sidebar-navlink"
              }
              onClick={() => setSidebarTrue(false)}
            >
              <img src={assets.appointment_icon} alt="" />
              <p>Appointments</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctor-profile"
              className={({ isActive }) =>
                isActive ? "sidebar-navlink active" : "sidebar-navlink"
              }
              onClick={() => setSidebarTrue(false)}
            >
              <img src={assets.doctor_icon} alt="" />
              <p>Doctor Profile</p>
            </NavLink>
          </li>
        </ul>
        <button onClick={logout} className='logout-btn'>Logout</button>
      </div>
      )}
    </>
  )
}

export default Sidebar
