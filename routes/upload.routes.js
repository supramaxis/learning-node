const router = require('express').Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const upload = multer({ dest: 'uploads' });
const { postFileIndex } = require('../controllers/upload.controller'); // importa el controlador upload.controller
const fileModel = require('../models/file.model');

router.get('/', (req, res) => { // crea una ruta para obtener el formulario de subida de archivos
  res.render('upload');
});

router.post('/', upload.single('file'), postFileIndex); // crea una ruta para subir archivos

router.route('/file/:id').get(handleDownload).post(handleDownload); // crea una ruta para descargar un archivo

async function handleDownload(req, res) { // crea una funcion para descargar un archivo
  const file = await fileModel.findById(req.params.id); // busca un archivo con el id que se le pasa en la base de datos

  if (file.password != null) { // si la contraseña no es nula
    if (req.body.password == null) { 
      res.render('password'); // renderiza la vista password.ejs
      return; // termina la ejecucion de la funcion
    }

    if (!(await bcrypt.compare(req.body.password, file.password))) { // si la contraseña no es correcta
      res.render('password', { error: true }); // renderiza la vista password.ejs con un error
      return; // termina la ejecucion de la funcion
    }
  }

  file.downloadCount++; // aumenta el contador de descargas del archivo
  await file.save(); // guarda el archivo en la base de datos
  console.log(file.downloadCount); // imprime el contador de descargas del archivo

  res.download(file.path, file.originalName); // descarga el archivo
}

module.exports = router;
