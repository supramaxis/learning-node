// ./models/user.model.js
const mongoose = require('mongoose')
var userSchema = new mongoose.Schema({ // crea un esquema para la base de datos
    username: { // nombre de usuario
        type : String,
        unique : true,
        required : true
    },
    password: { // contraseña
        type: String,
        required: true
    }
})
module.exports = mongoose.model('User', userSchema) // exporta el modelo User para asi poder usarlo para crear objetos