import React, { useContext, useState } from 'react'
import './Login.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { StoreContext } from '../../context/StoreContext.jsx'
import { useLocation, useNavigate } from 'react-router-dom'

const Login = () => {

  const { backendUrl, setToken } = useContext(StoreContext)
  const [account, setAccount] = useState("Create account")

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const onChangHandler = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setData({ ...data, [name]: value })
  }

  const onSubmitHandler = async (event) => {

    event.preventDefault()

    try {
      if (account === "Create account") {
        const response = await axios.post(`${backendUrl}/api/user/register`, data)

        if (response.data.success) {
          localStorage.setItem("userToken", response.data.userToken)
          setToken(response.data.userToken)
          toast.success(response.data.message);
          navigate(from, { replace: true })  //  go back to previous page
        } else {
          toast.error(response.data.message);
        }
      } else {

        const response = await axios.post(`${backendUrl}/api/user/login`, data)
        if (response.data.success) {
          toast.success(response.data.message);
          localStorage.setItem("userToken", response.data.userToken);
          setToken(response.data.userToken)
          navigate(from, { replace: true })  // go back to previous page
        } else {
          toast.error(response.data.message);
        }

      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    }

  }


  return (
    <form onSubmit={onSubmitHandler} >
      <div className='login'>
        <h2>{account}</h2>
        {
          account === "Create account" ? <p>Please sign up to book appointment</p> : <p>Please login to book appointment</p>
        }

        <div className='login-info'>
          {
            account === "Create account" ? <><label htmlFor="name">Full Name</label>
              <input type="text" id="name" onChange={onChangHandler} value={data.name} required /></> : ""
          }
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={onChangHandler} value={data.email} required />
          <label htmlFor="password">Password</label>
          <input type="password" id='password' onChange={onChangHandler} value={data.password} required />
        </div>
        <button className='btn-login'>{account}</button>
        <div className='login-account'>
          <p>Already have an account?</p><p onClick={() =>
            setAccount(account === "Create account" ? "Login" : "Create account")} style={{ color: "blue", cursor: "pointer" }}>{account === "Create account" ? "Login here" : "Create account"}</p>
        </div>
      </div>
    </form>
  )
}

export default Login