const express = require('express');
const shortUrlModel = require('../models/shortUrlModel');
const { getEditController, postEditController } = require('../controllers/edit.controller'); // importa el controlador edit.controller
const router = express.Router();

router.get('/:id', getEditController); 

router.post('/:id', postEditController) // crea una ruta para editar una url


module.exports = router;
