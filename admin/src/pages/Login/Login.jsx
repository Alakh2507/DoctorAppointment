import React, { use, useContext, useState } from 'react'
import './Login.css'
import { AdminContext } from '../../context/AdminContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../../context/DoctorContext.jsx'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate=useNavigate()
  const { setAToken, backendUrl } = useContext(AdminContext)
  const{setDToken,}=useContext(DoctorContext)

  const [state, setState] = useState("Admin")
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const onchangHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }))

  }
  const onsubmitHandler = async (e) => {
  e.preventDefault();

  try {

    if (state === "Admin") {

      const res = await axios.post(`${backendUrl}/api/admin/login`, data);

      if (res.data.success) {
        localStorage.setItem("atoken", res.data.atoken);
        setAToken(res.data.atoken);
        toast.success(res.data.message);
        setData({ email: "", password: "" });
      } else {
        toast.error(res.data.message);
      }

    } else {

      const docResponse = await axios.post(
        `${backendUrl}/api/doctor/login`,
        data
      );

      if (docResponse.data.success) {
        localStorage.setItem("dtoken", docResponse.data.token);
        setDToken(docResponse.data.token);
        toast.success(docResponse.data.message);
        setData({ email: "", password: "" });
         navigate("/doctor-dashboard");
      } else {
        toast.error(docResponse.data.message);
      }

    }

  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
  }
};

  

  return (
    <div className='formcontainer'>
      <form onSubmit={onsubmitHandler} className='formdata' >
        <p><span style={{ color: "blue" }}>{state}&nbsp;</span>Login</p>
        <div className='loginemail loginep'>
          <p>Email</p>
          <input type="email" name="email" value={data.email} onChange={onchangHandler} required />
        </div>
        <div className='loginpassword loginep'>
          <p>Password</p>
          <input type="password" name="password" value={data.password} onChange={onchangHandler} required />
        </div>
        <div className='btncontainer'>
          <button type='submit' className='btnlogin'>Login</button>
          {
            state === "Admin" ? <p>Doctor Login <span onClick={() => setState("Doctor")} style={{ color: "blue", cursor: "pointer" }}>Click here? </span></p> : <p>Admin Login? <span onClick={() => setState("Admin")} style={{ color: "blue", cursor: "pointer" }}>Click here</span></p>
          }
        </div>
      </form>
    </div>

  )
}

export default Login