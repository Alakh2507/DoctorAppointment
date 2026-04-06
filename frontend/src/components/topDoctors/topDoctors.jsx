import React, { useContext } from 'react'
import './TopDoctors.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'


const TopDoctors = () => {
    const {doctors,backendUrl,}=useContext(StoreContext)

    const navigate=useNavigate()

    return (
        <div className='topdoctor'>
            <h1>Top Doctors to Book</h1>
            <p>Simply browse through our extensive list of trusted doctors.</p>
            <div className='topdoctor-container'>
                {
                    doctors.slice(0, 10).map((item, index) => (
                        <div onClick={()=>navigate(`/appointment/${item._id}`)} key={index} className='topdoctor-detail'>
                            <img src={item.image} alt={item.name} />

                            <div className='topdoctor-info'>
                                <p style={ { color:"#0FBF00", padding:"1px  0px", fontSize: "13px" }}>Available</p>
                                <p className='itemname'>{item.name}</p>
                                <p style={{color:'gray'}}>{item.speciality}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='btn-topdoctor'>more</button>
        </div>
    )
}

export default TopDoctors