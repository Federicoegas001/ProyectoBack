import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {


  const [task, setTask] = useState([])
  const navigate = useNavigate()

  /* useEffect(()=>{
    axios.get('http://localhost:3010/home')
    .then(res =>{
      if(res.data === "Success"){
        navigate('/home')
      }else{
        console.log('esta maaal')
        navigate('/')
      }
    }).catch(err=> console.log(err))
  },[]) */

  useEffect(()=>{
    axios.get('http://localhost:3010/getTask')
    .then(res=>setTask(res.data))
    .catch(err=>console.log(err))
  },[])


  

  return (
    <div className='home-container'>
      
      <h1>Bienvenido a sus Tareas</h1>

      
      <div className='task-container'>
        {
          task.map((val,key)=>{
            return(
              <div key={key} className='home-task'>
                <h2>{val.Titulo}</h2>
                <h3>{val.descripcion}</h3>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home