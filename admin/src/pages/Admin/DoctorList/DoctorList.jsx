import React, {useEffect} from 'react'
import './DoctorList.css'
import { AdminContext } from '../../../context/AdminContext'
import { useContext } from 'react'


const DoctorList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailabilitydoctor, backendUrl, } = useContext(AdminContext);
  
  useEffect(() => {
    if(aToken){
    getAllDoctors();
    }
  }, [aToken])

  return aToken&& (
    <div className='doctor-container'>
      <h3>All Doctors</h3>
      <div className='doctor-cart-container'>
        {
          doctors.map((item, index) => (
            <div key={index} className='doctor-cart'>
              <img
                src={`${backendUrl}/uploads/${item.image}`}
                alt={item.name}
              />
              <div className='doctor-cart-info'>
                <h4>{item.name}</h4>
                <p>{item.speciality}</p>

                <label>
                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={() => changeAvailabilitydoctor(item._id)}
                  />
                  {item.available?(<span style={{color:"green"}}>Available</span>):(<span style={{color:"red"}}>Not available</span>)}
                </label>

              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorList