const express = require('express')
const router = express.Router()
const UserModel = require('../dao/models/User')
const TaskModel = require('../dao/models/Task')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const varifyAdmin = require('../dao/controllers/Controller')
const varifyUser = require('../dao/controllers/Controller')
const app = express()
app.use(cors())
app.use(express.json())


router.get('/',(req,res)=>{
    res.send('hola')
})

router.post('/register',(req,res)=>{
    const {name, password} = req.body;
    bcrypt.hash(password, 10)
    .then(hash=>{
        UserModel.create({name, password:hash})
        .then(user => res.json("Success"))
        .catch(err=> res.json(err))
    }).catch(err => res.json(err))
})


router.post('/login',(req,res)=>{
    const {name,password} = req.body;
    UserModel.findOne({name:name})
    .then(user=>{
        if(user){
            bcrypt.compare(password, user.password, (err,response)=>{
                if(response){
                    const token = jwt.sign({name: user.name, role: user.role},
                        process.env.SECRET_KEY ,{expiresIn:'1d'});
                    res.cookie('token', token)
                    return res.json({Status:"Success", role: user.role})
                }else{
                    return res.json('la password esta mal')
                }
            })
        }else{
            return res.json('no usuarios')
        }
    })
})


router.get('/dashboard', varifyAdmin,(req,res)=>{
    res.json('Success')
})

router.get('/home',varifyUser,(req,res)=>{
    res.send('Success')
})


router.post('/task',(req,res)=>{
    const {titulo, Descripcion} = req.body;
    TaskModel.create({Titulo: titulo, descripcion: Descripcion})
    .then(res=> console.log('tarea creada'))
    .catch(err=> console.log(err))
})

router.get('/getTask',async(req,res)=>{
    try {
        const result = await TaskModel.find({})
        res.send(result)
    } catch (error) {
        res.send(err)
    }
})

router.put('/newTask', async(req,res)=>{
    const Titulo = req.body.newTitulo;
    const id = req.body.id;
    try {
        const UpdateTask = await TaskModel.findById(id)
        UpdateTask.Titulo = Titulo
        await UpdateTask.save()
        res.send('actualizado')
    } catch (error) {
        console.log(error)
    }
})

router.put('/newDescripcion',async(req,res)=>{
    const Descripcion = req.body.newDescripcion
    const id = req.body.id;
    try {
        const actualizarDescripcion = await TaskModel.findById(id)
        actualizarDescripcion.descripcion = Descripcion
        await actualizarDescripcion.save()
        res.send('descripcion actualizada')
    } catch (error) {
        console.log(error)
    }
})

router.delete('/delete/:id', async(req,res)=>{
    const id = req.params.id;
    await TaskModel.findByIdAndDelete(id).exec()
    res.send('delete it')
})



module.exports = router