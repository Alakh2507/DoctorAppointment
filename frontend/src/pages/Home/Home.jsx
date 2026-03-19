import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header.jsx'
import SpecialityMenu from '../../components/SpecialityMenu/SpecialityMenu.jsx'
import TopDoctors from '../../components/topDoctors/topDoctors.jsx'
import BookAppointment from '../../components/BookAppointment/BookAppointment.jsx'


const Home=()=>{
    return (
        <div className='homecontainer'>
        <Header/>
        <SpecialityMenu/>
        <TopDoctors/>
        <BookAppointment/>
        </div>
    )
}

export default Home;