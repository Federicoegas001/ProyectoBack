import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  axios.defaults.withCredentials = true
  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post('http://localhost:3010/login',{name, password})
    .then(res =>{
      if(res.data.Status === 'Success'){
        if(res.data.role === 'admin'){
          navigate('/dashboard')
        }
        else if(res.data.role === 'user'){
          navigate('/home')
        }
      }else{
        navigate('/home')
      }
    }).catch(err=> console.log(err))
}

  return (
    <div className='login-contain'>
      <div className='login-container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label><br />
          <input type="text" name="username" id="username" onChange={(e)=>setName(e.target.value)}/><br />
          <label htmlFor="password">Password</label><br />
          <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)}/><br />
          <button type="submit">Login</button>
          <Link to='/'>Registrate</Link>
        </form>
      </div>
    </div>
  )
}

export default Login