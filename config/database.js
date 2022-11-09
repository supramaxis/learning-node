const mongoose = require('mongoose')


const dbURI = process.env.DB_URI; // establece la ruta de la base de datos
const db = mongoose 
.connect(dbURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true, 
}) //decir en la consola que se conecto satisfactoriamente a la base de datos
.then(() => console.log("Database Connected")) 
.catch((err) => console.log(err)); // si hay un error, muestra el error

module.exports = dbURI; // exporta el archivo database.js