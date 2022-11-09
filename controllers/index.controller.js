const shortUrlModel = require('../models/shortUrlModel');
const passport = require('passport');

exports.indexUrls = async (req, res) => { // lista las urls y renderiza la vista
  if (req.isAuthenticated()) {
    const shortUrlsFind = await shortUrlModel.find(); // busca todas las urls en la base de datos
    // console.log(shortUrlsFind);
    res.render('index2', { shortUrls: shortUrlsFind }); // renderiza la vista con las urls
  }
};

exports.indexPostUrls = async (req, res) => { // crea una url y la guarda en la base de datos
  await shortUrlModel.create({ full: req.body.fullUrl }); 
  console.log('URL Created'); // muestra en consola que se creo la url
  res.redirect('/'); // redirecciona a la vista index
};

exports.indexRedirectUrls = async (req, res) => { // redirige a la url original
  const shortUrl = await shortUrlModel.findOne({ short: req.params.shortUrl }); // busca la url en la base de datos
  if (shortUrl == null) return res.sendStatus(404); // si no existe la url, muestra error 404

  shortUrl.clicks++; // aumenta el contador de clicks
  shortUrl.save(); // guarda los cambios en la base de datos 
  console.log('click registered'); // muestra en consola que se registro un click
  res.redirect(shortUrl.full); // redirige a la url original
};

exports.indexDeleteUrl = async (req, res) => { // elimina una url
  await shortUrlModel.findByIdAndDelete(req.params.shortUrls); // busca la url en la base de datos
  console.log('URL Deleted'); // muestra en consola que se elimino la url
  res.redirect('/'); // redirecciona a la vista index
};

exports.indexGetLogin = (req, res) => { // renderiza la vista de login
  res.render('login'); 
}

exports.indexGetRegister = (req, res) => { // renderiza la vista de registro
  res.render('register');
}

exports.indexPostLogin = passport.authenticate("local", { // autentica al usuario
  successRedirect: "/", //si el usuario se autentico, redirige a la vista index
  failureRedirect: "/login",  //si el usuario no se autentico, redirige a la vista login
  failureFlash: true //muestra un mensaje de error
})

exports.indexGetLogout = (req, res, next) => { // cierra la sesion del usuario
  console.log('logged out'); // muestra en consola que se cerro la sesion
  req.logOut((err) => { // cierra la sesion
    if (err) return next(err); // si hay un error, muestra el error
    res.redirect('/'); // si hay un error redirecciona a la vista index
  }); 
};
