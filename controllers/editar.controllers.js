const shortUrlModel = require('../models/shortUrlModel');


exports.devGetEditController = async (req, res) => { //encuentra el id y lo muestra en el formulario
  try {
    const shortUrl = await shortUrlModel.findById(req.params.id).lean(); 
    console.log(req.params.id); // muestra en consola el id de la url

    res.render('editar', { shortUrl: shortUrl }); // renderiza la vista editar con la url
  } catch (error) { // si hay un error, muestra el error
    console.log(error.message); // muestra en consola el error
  }
}

exports.devPostEditController = async (req, res) => { // actualiza el id y lo muestra en la vista index
  console.log(req.body) // muestra en consola el body del formulario
 const { id } = req.params // obtiene el id de la url
  await shortUrlModel.findByIdAndUpdate(id, req.body) // actualiza el id

  res.redirect('/') // redirecciona a la vista index
}