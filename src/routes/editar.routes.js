const express = require('express');
const shortUrlModel = require('../models/shortUrlModel');
const { devGetEditController, devPostEditController } = require('../controllers/editar.controllers') // importa el controlador edit.controller
const router = express.Router();

router.get('/:id', devGetEditController); // crea una ruta para obtener el formulario de edicion

router.post('/:id', devPostEditController) // crea una ruta para editar una url


module.exports = router;