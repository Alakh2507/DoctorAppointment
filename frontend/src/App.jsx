import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home/Home'
import Doctors from './pages/Doctors/Doctors.jsx'
import Login from './pages/Login/Login.jsx'
import About from './pages/About/About.jsx'
import Contact from './pages/Contact/Contact.jsx'
import MyProfile from './pages/MyProfile/MyProfile.jsx'
import MyAppointment from './pages/MyAppointment/MyAppointment.jsx'
import Footer from './components/Footer/Footer.jsx'
import './App.css'
import Appointment from './pages/Appointment/Appointment.jsx'
import { useState } from 'react'
import Verify from './pages/verfyPayment.jsx'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from './components/Sidebar/Sidebar.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}



function App() {

  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <div className='appcontainer
      '>
        <ToastContainer />
        <Navbar sidebar={sidebar} setSidebar={setSidebar} />
        <div style={{ width: "100%", display: "flex" }}>
          <div style={{ width: "100%" }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/doctors' element={<Doctors />} />
              <Route path='/doctors/:speciality' element={<Doctors />} />
              <Route path='/login' element={<Login />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/myprofile' element={<MyProfile />} />
              <Route path='/myappointment' element={<MyAppointment />} />
              <Route path='/appointment/:docId' element={<Appointment />} />
              <Route path='/verify' element={<Verify/>} />
            </Routes>
            <Footer />
          </div>
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        </div>
      </div>

    </>
  )
}

export { App, ScrollToTop }
