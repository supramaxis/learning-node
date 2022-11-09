const mongoose = require('mongoose')
const shortId = require('shortid')

const shortUrlSchema = new mongoose.Schema({ // crea un esquema para la base de datos
  full: { // url completa
    type: String,
    required: true
  },
  short: { // url corta
    type: String,
    required: true,
    default: shortId.generate
  },
  clicks: { // contador de clicks
    type: Number,
    required: true,
    default: 0 // por defecto el contador es 0
  }
})


module.exports = mongoose.model('shortUrlModel', shortUrlSchema) // exporta el modelo shortUrlModel para asi poder usarlo para crear objetos