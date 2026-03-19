import React, { useEffect } from 'react'
import "./DoctorProfile.css"
import { useContext,useState } from 'react'
import{DoctorContext } from '../../../context/DoctorContext.jsx'
import axios from 'axios'
import {toast} from 'react-toastify'


const DoctorProfile = () => {

  const {dToken,profileData,setProfileData, getProfileData,backendUrl}=useContext(DoctorContext)
  const[isEditing, setIsEditing]=useState(false)
  const[image,setImage]=useState("")
 

  useEffect(()=>{
    if(dToken){
      getProfileData()
    }
  },[dToken])

  
 
  const handleProfileUpdate=async()=>{
    try{
 
  const formData=new FormData()
  formData.append("name",profileData.name)
  formData.append("speciality",profileData.speciality)
  formData.append("experience",profileData.experience)
  formData.append("about",profileData.about)
  formData.append("available",profileData.available)  
  formData.append("line1",profileData?.address?.line1)
  formData.append("line2",profileData?.address?.line2)  
  if(image){
    formData.append("image",image)
  }
   
  for (let pair of formData.entries()) {
  console.log(pair[0], pair[1])
}
      const response=await axios.post(`${backendUrl}/api/doctor/updateDoctorProfile`,formData,{headers:{Authorization:`Bearer ${dToken}`}})
      if(response.data.success){
        toast.success(response.data.message)
        getProfileData() //Refresh profile data after update
      }

    }catch(error){
      toast.error(error.response?.data?.message ||"Server error")
    }
  }

   console.log(profileData)

  return (
  <div className="mypro-container">

    <div className="mypro-image-box">
      {
        isEditing ?
          <>
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />

            <label htmlFor="image">
              <img
                className="mypro-img"
                src={
                  image
                    ? URL.createObjectURL(image)
                    : `${backendUrl}/uploads/${profileData.image}`
                }
                alt=""
              />
            </label>
          </>
          :
          <img
            className="mypro-img"
            src={`${backendUrl}/uploads/${profileData.image}`}
            alt=""
          />
      }
    </div>


    <div className="mypro-field">
      {
        isEditing
          ? <input
              className="mypro-input myproname"
              type="text"
              value={profileData.name}
              onChange={(e) =>
                setProfileData(prev => ({
                  ...prev,
                  name: e.target.value
                }))
              }
            />
          : <p className="myproname">{profileData.name}</p>
      }
    </div>


    <div className="mypro-field">
      {
        isEditing
          ? <input
              className="mypro-input"
              type="text"
              value={profileData.speciality}
              onChange={(e) =>
                setProfileData(prev => ({
                  ...prev,
                  speciality: e.target.value
                }))
              }
            />
          : <p>{profileData.speciality}</p>
      }
    </div>


    <div className="mypro-field">
      {
        isEditing
          ? <input
              className="mypro-input"
              type="text"
              value={profileData.experience}
              onChange={(e) =>
                setProfileData(prev => ({
                  ...prev,
                  experience: e.target.value
                }))
              }
            />
          : <p>Experience : {profileData.experience} years</p>
      }
    </div>


    <div className="mypro-field">
      {
        isEditing
          ? <textarea
              className="mypro-textarea"
              rows={5}
              value={profileData.about}
              onChange={(e) =>
                setProfileData(prev => ({
                  ...prev,
                  about: e.target.value
                }))
              }
            />
          : <p>{profileData.about}</p>
      }
    </div>


    <div className="mypro-field">
      {
        isEditing
          ? <input
              type="checkbox"
              checked={profileData.available}
              onChange={(e) =>
                setProfileData(prev => ({
                  ...prev,
                  available: e.target.checked
                }))
              }
            />
          :
          <p className={profileData.available ? "green" : "red"}>
            {profileData.available ? "Available" : "Not Available"}
          </p>
      }
    </div>


    <div className="mypro-field mypro-address">
      {
        isEditing ?
          <>
            <input
              className="mypro-input"
              type="text"
              value={profileData?.address?.line1 || ""}
              onChange={(e) =>
                setProfileData(prev => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    line1: e.target.value
                  }
                }))
              }
            />

            <input
              className="mypro-input"
              type="text"
              value={profileData?.address?.line2 || ""}
              onChange={(e) =>
                setProfileData(prev => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    line2: e.target.value
                  }
                }))
              }
            />
          </>
          :
          <p>
            Address: {profileData?.address?.line1} {profileData?.address?.line2}
          </p>
      }
    </div>


    <button
      className="myproeditbtn"
      onClick={() => {
        if (isEditing) {
          handleProfileUpdate()
          setIsEditing(false)
        } else {
          setIsEditing(true)
        }
      }}
    >
      {isEditing ? "Save Profile" : "Edit Profile"}
    </button>

  </div>
)
}

export default DoctorProfile