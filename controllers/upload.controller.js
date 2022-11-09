const fileModel = require('../models/file.model');
const multer = require('multer');
const bcrypt = require('bcrypt');
const upload = multer({ dest: 'uploads' }); // crea una constante para subir archivos

exports.postFileIndex = async (req, res) => { // crea una funcion para subir archivos
  const fileData = { 
    path: req.file.path, // guarda la ruta del archivo
    originalName: req.file.originalname, // guarda el nombre original del archivo
  } // crea un objeto para guardar los datos del archivo
if(req.body.password !== null && req.body.password !== ''){ // si la contraseña no es nula o vacia
  fileData.password = await bcrypt.hash(req.body.password, 10); // encripta la contraseña
} 
const file = await fileModel.create(fileData); // crea un archivo con los datos del objeto

res.render('file', {fileLink: `${req.headers.origin}/upload/file/${file._id}`}); // renderiza la vista file.ejs con el link del archivo
}
