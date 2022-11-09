const shortUrlModel = require('../models/shortUrlModel');
const passport = require('passport');

exports.devIndexUrls = async (req, res) => {
  const shortUrlsFind = await shortUrlModel.find();
  // console.log(shortUrlsFind);
  res.render('index', { shortUrls: shortUrlsFind });
};

exports.devIndexPostUrls = async (req, res) => {
  await shortUrlModel.create({ full: req.body.fullUrl });
  console.log('URL Created');
  res.redirect('/');
};

exports.devIndexDeleteUrl = async (req, res) => {
  await shortUrlModel.findByIdAndDelete(req.params.shortUrls);
  console.log('URL Deleted');
  res.redirect('/');
};

exports.devIndexGetLogout = (req, res, next) => {
  res.send('log');
  // console.log('logged out');
  // req.logOut((err) => {
  //   if (err) return next(err);
  //   res.redirect('/');
  // });
};

exports.indexPostLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});
