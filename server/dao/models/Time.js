const mongoose = require('mongoose')

const TimeSchema = new mongoose.Schema({
    fechaInicial : String,
    fechaFinalizacion: String,

})

const TimeModel = mongoose.model('time', TimeSchema)

module.exports = TimeModel