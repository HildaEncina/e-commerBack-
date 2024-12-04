const mongoose = require('mongoose');
const { productoSchema } = require('./producto');

const carritoSchema = new mongoose.Schema({
    idUsuario: {
        type: String,
    },
    cantidadProductos: {
        type: Number,
        default: 0,
    },
    montoTotal: {
        type: Number,
        default: 0,
    },
    productos: [productoSchema], /** Crear un metodo que busque a esta lista, busque al producto, y lo elimine */
}, { timestamps: true });

const Carrito = mongoose.model('Carrito', carritoSchema);

module.exports = { Carrito, carritoSchema };
