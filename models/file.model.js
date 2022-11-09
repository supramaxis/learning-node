const mongoose = require("mongoose")

const FileSchema = new mongoose.Schema({ // crea una nueva estructura para la base de datos
  path: { 
    type: String, 
    required: true, 
  },
  originalName: { // nombre original del archivo
    type: String,
    required: true,
  },
  password: String,
  downloadCount: { // contador de descargas
    type: Number, 
    required: true,
    default: 0, //por defecto el contador es 0
  },
})

module.exports = mongoose.model("fileModel", FileSchema) // exporta el modelo fileModel y asi poder usarlo para crear objetos