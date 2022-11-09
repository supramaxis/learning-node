const express = require('express');
const {
  indexUrls,
  indexPostUrls,
  indexDeleteUrl,
  indexRedirectUrls,
  indexGetRegister,
  indexGetLogin,
  indexPostLogin,
  indexGetLogout
} = require('../controllers/index.controller');
const { registerService } = require('../controllers/register.controller');
const router = express.Router();
const shortUrlModel = require('../models/shortUrlModel');
const passport = require('passport');

router.get('/', checkAuthenticated, indexUrls); //renderiza la pagina de inicio

router.get('/register', checkNotAuthenticated, indexGetRegister ); //renderiza la pagina de registro

router.post('/register', checkNotAuthenticated, registerService); //registra un usuario

router.get('/login', checkNotAuthenticated, indexGetLogin ); //renderiza la pagina de login

router.post('/login', checkNotAuthenticated, indexPostLogin); //autentica un usuario

router.get('/logout', indexGetLogout); //cierra la sesion de un usuario

router.post('/shortUrls', checkAuthenticated, indexPostUrls); //crea una url

router.get('/:shortUrl', checkAuthenticated, indexRedirectUrls); //redirige a la url original

router.delete('/:shortUrls', checkAuthenticated, indexDeleteUrl); //elimina una url


function checkAuthenticated(req, res, next){ //revisa si esta autenticado si no lo envia a login
  if(req.isAuthenticated()){
      return next()
  }
  res.redirect("/login") //si no esta autenticado lo envia a login
}

function checkNotAuthenticated(req, res, next){ //revisa si no esta autenticado si no lo envia a index
  if(req.isAuthenticated()){
      return res.redirect("/") //si esta autenticado lo envia a index
  }
  next()
}

module.exports = router;
