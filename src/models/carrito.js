const mongoose = require('mongoose');
const {productoSchema} = require('./producto');


const carritoSchema = new mongoose.Schema({
    idProducto: {
        type: String,
       
    },
    idUsuario:{
        type: String,
       
    },
    productos: [productoSchema]
   
},
{timestamps: true});

const Carrito = mongoose.model('carrito', carritoSchema); 

module.exports = Carrito; 