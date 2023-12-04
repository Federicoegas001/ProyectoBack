const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    Titulo: {
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        require:true
    }
})

const TaskModel = mongoose.model("Tareas", TaskSchema)

module.exports = TaskModel