import { useState } from 'react'
import './App.css'
import {  Dashboard, Home, Login, SignUp } from './screens'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element ={<SignUp/>}/>
          <Route path='/login' element ={<Login/>}/>
          <Route path='/dashboard' element ={<Dashboard/>}/>
          <Route path='/home' element ={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
