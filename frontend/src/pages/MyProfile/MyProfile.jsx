import React, { useState } from 'react'
import './MyProfile.css'
import { assets } from '../../assets/assets_frontend/assets.js'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext.jsx'
import { useContext } from 'react'
import { toast } from 'react-toastify'


const MyProfile = () => {

  const { backendUrl, token, image, userData, setUserData, getUserData } = useContext(StoreContext)


  const [isEdit, setIsEdit] = useState(false);
  const [imageupload, setImageUpload] = useState("")



  const updateUserProfile = async () => {
    try {

      const formData = new FormData()
      formData.append("name", userData.name)
      formData.append("email", userData.email)
      formData.append("phone", userData.phone)
      formData.append("gender", userData.gender)
      formData.append("dob", userData.dob)

      // send separately
      formData.append("line1", userData.address.line1)
      formData.append("line2", userData.address.line2)

      if (imageupload) {
        formData.append("image", imageupload)
      }

      const response = await axios.post(`${backendUrl}/api/user/editprofile`, formData, { headers: { Authorization: `Bearer ${token}` } })
      if (response.data.success) {
        toast.success(response.data.message || "Profile Updated")
        setIsEdit(false);
        getUserData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error")
    }
  }

  console.log(image)
  return (
    <div className='myprofileContainer'>
      {/*imagex  */}
      <div className='upload'>
        {!isEdit ? <img className='upload-img' style={{ width: "250px", height: "250px", }} src={image ? `${backendUrl}/uploads/${image}` : assets.profile_pic} alt="image" /> : <>

          <label htmlFor="image"><img style={{ width: "250px", height: "250px" }} src={imageupload ? URL.createObjectURL(imageupload) : assets.profile_pic} alt="" /></label>
          <input type="file" id='image' hidden onChange={(e) => setImageUpload(e.target.files[0])} />
        </>}
      </div >
      {/* name */}
      {
        isEdit ? <input className='myproname' style={{ border: "none" }} type='text' value={userData.name} onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} /> : <p className='myproname' >{userData.name}</p>
      }
      <hr />
      <div className='myproinfoContainer'>
        <p className='myprocontatinfo' >CONTACT INFORMATION</p>
        <div>
          {/* email */}
          <div className='myproall'>
            <label htmlFor="email">Email.id:</label>
            {
              isEdit ? <input id='email' type="text" value={userData.email} onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))} /> : <p >{userData.email}</p>
            }
          </div>
          {/* phone */}
          <div className='myproall'>
            <label htmlFor="phone">Phone:</label>
            {
              isEdit ? <input id='phone' type="text" value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} /> : <p >{userData.phone}</p>
            }
          </div>
          {/* address */}
          <div className='myproall'>
            <label>Address:</label>

            {isEdit ? (
              <>
                <input
                  type="text"
                  placeholder="Address Line 1"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData(prev => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line1: e.target.value
                      }
                    }))
                  }
                />

                <input
                  type="text"
                  placeholder="Address Line 2"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData(prev => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line2: e.target.value
                      }
                    }))
                  }
                />
              </>
            ) : (
              <p>
                {userData.address.line1}, {userData.address.line2}
              </p>
            )}
          </div >

          <p className='myprocontatinfo'>BASIC INFORMATION</p>
          {/* Gender */}
          <div className='myproall'>
            <label>Gender:</label>

            {isEdit ? (
              <>
                <label >
                  <input type='radio'
                    name="gender"
                    value="male"
                    checked={userData.gender === "male"}
                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={userData.gender === "female"}
                    onChange={(e) =>
                      setUserData(prev => ({ ...prev, gender: e.target.value }))
                    }
                  />
                  Female
                </label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={userData.gender === "other"}
                    onChange={(e) =>
                      setUserData(prev => ({ ...prev, gender: e.target.value }))
                    }
                  />
                  Other
                </label>
              </>
            ) : (
              <p>{userData.gender}</p>
            )}
          </div>
          {/*  Date of Birth */}
          <div className='myproall'>
            <label htmlFor="dob">Date of Birth:</label>

            {isEdit ? (
              <input
                type="date"
                id="dob"
                name="dob"
                onChange={(e) =>
                  setUserData(prev => ({
                    ...prev,
                    dob: e.target.value
                  }))
                }
                value={userData.dob}
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>
        </div>
      </div>
      <button
        className='myproeditbtn'
        onClick={() => {
          if (isEdit) {
            updateUserProfile()
          } else {
            setIsEdit(true)
          }
        }}
      >
        {isEdit ? "Save Profile" : "Edit Profile"}
      </button>

    </div>
  )
}

export default MyProfile