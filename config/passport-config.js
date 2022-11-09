const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // crea una constante para usar la estrategia de autenticacion local
const mongoose = require('mongoose')
const User = require('../models/users.model')
const bcrypt = require('bcrypt')
const authenticateUser = async (username, password, done) => { // crea una funcion para autenticar un usuario
    User.findOne({ username: username }).then((user) => { // busca un usuario con el username que se le pasa
        if (!user) // si no encuentra un usuario con el username que se le pasa
            return done(null, false, { message: 'No user with that username' }) // devuelve un error diciendo que no hay un usuario con ese username
        if(bcrypt.compareSync(password,user.password)) // compara la contraseña que se le pasa con la contraseña que esta en la base de datos 
            return done(null, user) // si las contraseñas coinciden, devuelve el usuario
        else // si las contraseñas no coinciden
            return done(null, false,{ message: 'wrong password' }); // devuelve un error diciendo que la contraseña es incorrecta
    }).catch((err) => {  // si hay un error 
        done(err); // devuelve el error
    });
}
const strategy  = new LocalStrategy(authenticateUser); // crea una estrategia de autenticacion local
passport.use(strategy); // usa la estrategia de autenticacion local
passport.serializeUser((user, done) => { // serializa el usuario
    done(null, user.id); 
});
passport.deserializeUser((userId, done) => { // deserializa el usuario
    User.findById(userId) // busca un usuario con el id que se le pasa
        .then((user) => { // si encuentra un usuario
            done(null, user); // devuelve el usuario
        }) 
        .catch(err => done(err)) // si hay un error, devuelve el error
});