const express = require('express')
const mongoose = require('./config/dbConfig')
const cors = require('cors')
const router = require('./Routes/Routes')
const cookieParser = require('cookie-parser')


const app = express()
app.use(cors({
    origin:['http://localhost:5173'],
    methods:['GET','POST','PUT','DELETE'],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())


app.use('/', router)

app.use('/register', router)

app.use('/login', router)

app.use('/task', router)

app.use('/getTask',router)

app.use('/newTask',router)

app.listen(3010,()=>{
    console.log("server is running")
})