import React, { useState } from 'react'
import './Login.css'


const Login = () => {

  const [account, setAccount] = useState("Create account")
  return (
    <div className='login'>
      <h2>{account}</h2>
      {
        account === "Create account" ? <p>Please sign up to book appointment</p> : <p>Please login to book appointment</p>
      }

      <div className='login-info'>
        {
          account === "Create account" ? <><label htmlFor="name">Full Name</label>
            <input type="text" name="" id="name" /></> : ""
        }
        <label htmlFor="email">Email</label>
        <input type="email" name="" id="email" />
        <label htmlFor="password">Password</label>
        <input type="text" id='password' />
      </div>
      <button className='btn-login'>{account}</button>
      <div className='login-account'>
        <p>Already have an account?</p><p onClick={() => setAccount("Login")} style={{ color: "blue" }}>Login here</p>
      </div>
    </div>
  )
}

export default Login