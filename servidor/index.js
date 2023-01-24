const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");

//crear servidor
const app = express();

// conectamos la BD
conectarDB();

app.use(cors())

app.use(express.json()); /// habilitar el formato json para la app

app.use('/api/productos', require('./routes/producto'));

app.listen(4040, () => {
    console.log('El servidor esta corriendo');
})