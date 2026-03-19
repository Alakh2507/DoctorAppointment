import React, { useState } from 'react'
import './AddDoctor.css'
import { assets } from '../../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useContext } from 'react'
import { AdminContext } from '../../../context/AdminContext'

const AddDoctor = () => {

  const { backendUrl, aToken } = useContext(AdminContext)

  const [image, setImage] = useState(null)

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    experience: "",
    fees: "",
    about: "",
    speciality: "",
    degree: "",
    line1: "",
    line2: ""
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!image) {
      toast.error("Please upload doctor image")
      return
    }

    try {
      const formData = new FormData()

      formData.append("image", image)

      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
      const response = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData,{ headers: {Authorization: `Bearer ${aToken}`}}
)
      if (response.data.success) {
        toast.success(response.data.message)
        setData({
          name: "",
          email: "",
          password: "",
          experience: "",
          fees: "",
          about: "",
          speciality: "",
          degree: "",
          line1: "",
          line2: ""
        })
        setImage(null)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      const msg = error.response?.data?.message || "Somthing went wrong"
      toast.error(msg)
    }


  }

  return aToken&&(
    <div className='addDoctor-container'>
      <h3>Add Doctor</h3>

      <form className='addDocform' onSubmit={onSubmitHandler} >
        
        <div className='upload'>
          <label htmlFor="image"><img className='upload-img' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" /></label>
          <input type="file" name="image" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} hidden />
          <p>Upload doctor <br /> picture</p>
        </div >
        <div className='addalldata'>
          <div className='addDoc-left'>
            <div className='addDoc-left-data'>
              <p>Doctor name</p>
              <input type="text" placeholder='Name' name="name" value={data.name} onChange={onChangeHandler} required />
            </div>
            <div className='addDoc-left-data'>
              <p>Doctor Email</p>
              <input type="email" style={{ background: "#eeecec" }} placeholder='alakh.kushwaha1@gmail.com' name='email' value={data.email} onChange={onChangeHandler} required />
            </div>
            <div className='addDoc-left-data'>
              <p>Doctor Password</p>
              <input type="password" style={{ background: "#eeecec" }} placeholder='........' name='password' value={data.password} onChange={onChangeHandler} required />
            </div>
            <div className='addDoc-left-data'>
              <p>Experience</p>
              <input type="text" placeholder='Experience' name='experience' value={data.experience} onChange={onChangeHandler} required />
            </div>
            <div className='addDoc-left-data'>
              <p>Fees</p>
              <input type="number" placeholder='Your fees' name='fees' value={data.fees} onChange={onChangeHandler} required />
            </div>
            <div className='addDoc-left-data'>
              <p>About me</p>
              <textarea name="about" value={data.about} onChange={onChangeHandler} placeholder='write about yourself'></textarea>
            </div>
          </div>
          <div className='addDoc-right'>
            <div className='addDoc-right-data' >
              <p>Speciality</p>
              <input type="text" placeholder='General physician' name='speciality' value={data.speciality} onChange={onChangeHandler} required />
            </div>
            <div className='addDoc-right-data'>
              <p>Education</p>
              <input type="text" placeholder='Education' name='degree' value={data.degree} onChange={onChangeHandler} required />
            </div>
            <div style={{ display: 'flex', flexDirection: "column", gap: "10px" }} className='addDoc-right-data'>
              <p>Address</p>
              <input type="text" placeholder='Address 1' name='line1' value={data.line1} onChange={onChangeHandler} required />
              <input type="text" placeholder='Address 2' name='line2' value={data.line2} onChange={onChangeHandler} required />
            </div>
          </div>

        </div>
        <button type='submit' className='addDoc-btn'>Add doctor</button>
      </form>
    </div>
  )
}

export default AddDoctor