const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name : String,
    password: String,
    role:{
        type: String,
        default: "user"
    }
})


const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel