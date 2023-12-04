const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

mongoose.connect(process.env.CONNECTION_STRING).then(res => console.log('conexion exitosa')).catch(err=>console.log('conexion fallida'))


module.exports = mongoose