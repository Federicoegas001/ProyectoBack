import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Dashboard.css'

const Dashboard = () => {

  const [titulo, setTitulo] = useState('')
  const [Descripcion, setDescripcion] = useState('')
  const [task, setTask] = useState([])
  const [newTitulo, setNewTitulo] = useState('')
  const [newDescripcion, setNewDescripcion] = useState('')
  axios.defaults.withCredentials = true
  const [success , setSuccess] = useState()
  const navigate = useNavigate()

  useEffect(()=>{
    axios.get('http://localhost:3010/dashboard')
    .then(res =>{
      if(res.data === "Success"){
        setSuccess("Successded ok")
      }else{
        navigate('/login')
      }
    }).catch(err=> console.log(err))
  },[])

  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post('http://localhost:3010/task',{titulo, Descripcion}).then(res => alert('tarea creada')).catch(err=> console.log(err))
  }

  useEffect(()=>{
    axios.get('http://localhost:3010/getTask')
    .then(res=>setTask(res.data))
    .catch(err=>console.log(err))
  },[])

  const updateTask = (id) =>{
    axios.put('http://localhost:3010/newTask',{id:id, newTitulo: newTitulo})
  }

  const actualizarDescripcion = (id) =>{
    axios.put('http://localhost:3010/newDescripcion',{id:id, newDescripcion: newDescripcion})
  }

  const eliminarTask = (id) =>{
    axios.delete(`http://localhost:3010/delete/${id}`,{id:id, newTitulo: newTitulo})
  }


  return (
    <>
    <div className='dashboard-container'>
      <div className='dashboard-formulario'>
        <form className='formulario' onSubmit={handleSubmit}>
        <h1>Creacion de Tareas</h1>
        <h2>Titulo</h2>
        <input type="text" placeholder='Task' onChange={(e) =>setTitulo(e.target.value)}/>
        <h2>Descripcion</h2>
        <input type="text" placeholder='Descripcion' onChange={(e) =>setDescripcion(e.target.value)}/>
        <button type='submit'>Crear Tarea</button>
        </form>   
      </div>
      <div className='task-container'>
        {
          task.map((val,key)=>{
            return(
              <div key={key} className='task'>
                <div className='task-titulos'>
                  <h2>Titulo <br />{val.Titulo}</h2>
                  <h3>Descripcion <br />{val.descripcion}</h3>
                </div>
                <div className='task-container-form'>
                  <div>
                  <input type="text" onChange={(e)=> setNewTitulo(e.target.value)} placeholder='Actualiza el titulo'/>
                  <button onClick={()=>updateTask(val._id)}>Actualizar Titulo Tarea</button>
                  </div>
                  <div>
                  <input type="text" onChange={(e)=> setNewDescripcion(e.target.value)} placeholder='Actualiza la Descripcion'/>
                  <button onClick={()=>actualizarDescripcion(val._id)}>Actualizar Descripcion Tarea</button>
                  </div>
                  <button onClick={()=>eliminarTask(val._id)}>Eliminar Tarea</button>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  </>
  )
}


export default Dashboard