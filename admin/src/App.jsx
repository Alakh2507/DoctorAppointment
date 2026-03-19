import './App.css'
import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import{ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useState } from 'react'
import { AdminContext } from './context/AdminContext.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import AllAppointment from './pages/Admin/AllAppointment/AllAppointment.jsx'
import AddDoctor from './pages/Admin/AddDoctor/AddDoctor.jsx'
import DoctorList from './pages/Admin/DoctorList/DoctorList.jsx'
import Doshboard from './pages/Admin/Dashboard/Doshboard.jsx'
import { DoctorContext } from './context/DoctorContext.jsx'
import DoctorDashboard from './pages/Doctor/DoctorDashboard/DoctorDashboard.jsx'
import DoctorAppointments from './pages/Doctor/DoctorAppointments/DoctorAppointments.jsx'
import DoctorProfile from './pages/Doctor/DoctorProfile/DoctorProfile.jsx'



function App() {
   const [sidebarTrue,setSidebarTrue]=useState(false)

  const{aToken} =useContext(AdminContext)
  const {dToken}=useContext(DoctorContext)


  return aToken||dToken? (
   <div className='appcontainer'>
    <Navbar sidebarTrue={sidebarTrue} setSidebarTrue={setSidebarTrue}/>
    <ToastContainer/>
    <div  className='sideanddisplay' >
      <Sidebar sidebarTrue={sidebarTrue} setSidebarTrue={setSidebarTrue}/>
      <Routes>
        {/* Admin Route */}
        <Route path='/' element={<></>}/>
        <Route path='/admin-dashboard' element={<Doshboard/>}/>
        <Route path='/all-appoints' element={<AllAppointment/>}/>
        <Route path='/add-doctor' element={<AddDoctor/>}/>
        <Route path='/add-list' element={<DoctorList/>}/>
        {/* Doctor Route */}
        <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
        <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>
        <Route path='/doctor-profile' element={<DoctorProfile/>}/>
      </Routes>
    </div>
   </div>
  ):(
    <div className='appcontainer' >
    <Login/>
     <ToastContainer/>
    </div>
  )
}

export default App
