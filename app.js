const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');
const app = express();
const methodOverride = require('method-override');
const flash = require('express-flash');

require('dotenv').config(); // carga variables de entorno
app.use(flash()); // para mostrar mensajes de error
app.use(morgan('dev')); // muestra en consola las peticiones http
app.use(express.json());
app.set('views', path.join(__dirname, 'views')); // establece la ruta de las vistas
app.use(express.static(path.join(__dirname, 'public'))); // para que se pueda acceder a los archivos estaticos
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false })); // para que se pueda acceder a los datos de los formularios
app.use(methodOverride('_method')); //para que funcione el metodo delete y put en el formulario

app.use(
  session({
    secret: 'keyboard-secret', // session secret
    resave: false, // save session even if unmodified
    saveUninitialized: false, // no guarda la sesion si no se ha iniciado
    store: MongoStore.create({ mongoUrl: process.env.DB_URI }) // crea una sesion en la base de datos
  })
);

require('./config/passport-config'); // carga el archivo de configuracion de passport

app.use(passport.initialize()); // inicializa passport
app.use(passport.session()); // para que se pueda acceder a los datos de la sesion

//Routes
app.use('/do', require('./routes/do.routes'));
app.use('/bin', require('./routes/bin.routes'));
app.use('/upload', require('./routes/show.routes'));
app.use('/dev', require('./routes/dev.routes'));
// app.use('/upload', require('./src/routes/upload.routes'));
app.use('/editar', require('./routes/editar.routes'));
app.use('/edit', require('./routes/edit.routes'));
app.use('/', require('./routes/index.routes'));
module.exports = app; // exporta el archivo app.js

