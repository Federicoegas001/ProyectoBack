import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './SignUp.css'

const SignUp = () => {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:3010/register',{name, password})
        .then(res =>{
            navigate('/login')
        }).catch(err=> console.log(err))
    }

  return (
    <div className='register-contain'>
        <div className='register-container'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" onChange={(e)=> setName(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" onChange={(e)=> setPassword(e.target.value)}/>
                <button type='submit'>Registrate</button>
                <Link to='/login'>Login</Link>
            </form>
        </div>
    </div>
  )
}

export default SignUp