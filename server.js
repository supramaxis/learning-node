const app = require('./app'); // importa el archivo app.js que tiene todas las configuraciones de express
require('dotenv').config();
const yup = require('yup')


// const schema = yup.object().shape({
//   slug: yup.string().trim().matches(/^[\w\-]+$/i),
//   url: yup.string().trim().url().required(),
// });

const db = require('./config/database');


const port = process.env.PORT || 4400; // establece el puerto de la aplicacion
app.listen(process.env.PORT || 4400); // inicia la aplicacion
console.log(`listening at http://localhost:${port}`); // muestra en consola el puerto de la aplicacion
