import React from 'react'
import './Navbar.css'
import { useContext } from 'react'
import { assets } from '../../assets/assets_frontend/assets.js'
import { StoreContext } from '../../context/StoreContext.jsx'
import { useNavigate, NavLink } from 'react-router-dom';


const Navbar = ({ sidebar, setSidebar }) => {

  const { token, setToken, profile } = useContext(StoreContext)
  const navigate = useNavigate();

  const LogOutUser = () => {
    localStorage.removeItem("userToken")
    navigate("/")
    setToken("")
  }

  return (
    <div className='navbar'>
      <div className='navbar-1'>
        <img className='' onClick={() => navigate("/")} src={assets.logo} alt="" />
        <ul>
          <NavLink to={"/"}> <li >HOME</li></NavLink>
          <NavLink to={"/doctors"}><li >ALL DOCTORS</li></NavLink>
          <NavLink to={"/about"}><li >ABOUT</li></NavLink>
          <NavLink to={"/contact"}><li >CONTACT</li></NavLink>
        </ul>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {token ? <div className='create'>
            <img src={profile ? `${profile}` : assets.profile_pic} alt="" />
            <img style={{ paddingBottom: "10px" }} src={assets.dropdown_icon} alt="" />
            <div className='my-app-container'>
              <div className='my-appointment'>
                <p onClick={() => navigate("/myprofile")}>My Profile</p>
                <p onClick={() => navigate("/myappointment")}>My Appointments</p>
                <p onClick={LogOutUser}>Logout</p>
              </div>
            </div>
          </div>

            : <button onClick={() => navigate("/login")} className='nav-btn'>Create account</button>
          }

          <div className='sidebar-icon1'><img
            src={assets.menu_icon}
            className='max-w-[25px] sm:w-[30px]  cursor-pointer'

            alt="menu"
            onClick={() => setSidebar(!sidebar)}
          />
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default Navbar