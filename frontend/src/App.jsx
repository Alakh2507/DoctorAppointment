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
function App() {
  return (
    <>
    <div className='appcontainer'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/myprofile' element={<MyProfile/>} />
        <Route path='/myappointment' element={<MyAppointment/>} />
        <Route path='/appointment/:docId' element={<Appointment/>} />
      </Routes>
      <Footer/>
      </div>
    </>
  )
}

export default App
