const router = require('express').Router();
const {
  devIndexUrls,
  devIndexPostUrls,
  devIndexGetLogout,
  devIndexDeleteUrl
} = require('../controllers/dev.controllers');

router.get('/', checkAuthenticated, devIndexUrls);

router.post('/shortUrls', checkAuthenticated, devIndexPostUrls);

router.delete('/:shortUrls', checkAuthenticated, devIndexDeleteUrl);

router.get('/user/logout', devIndexGetLogout);



function checkAuthenticated(req, res, next) {
  //revisa si esta autenticado si no lo esta lo envia a login
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  //revisa si no esta autenticado si lo esta lo envia a index
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

module.exports = router;
