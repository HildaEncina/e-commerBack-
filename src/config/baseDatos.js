require('dotenv').config();

const mongodb = process.env.DB_URI;
const mongoose = require('mongoose');

mongoose.connect(mongodb)
    .then(() => {
        console.log("Conexión exitosa a la base de datos 'vinoteca'");
    })
    .catch((error) => {
        console.log(`Hubo un error al conectar con la base de datos: ${error}`);
    });