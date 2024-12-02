const mongoose = require('mongoose');



const productoSchema = new mongoose.Schema({
    marca: {
        type: String,
        required: [true, 'Por favor proporciona la marca del producto.'],
        minLength: [3, 'Por favor proporciona una marca real.']
    },
    tipo: {
        type: String,
        required: [true, 'Por favor proporciona el tipo de producto.'],
        minLength: [3, 'Por favor proporciona un tipo real.']
    },
    descripcion: {
        type: String,
        required: [true, 'Por favor proporcione una descripcion'],
        minLength: [3, 'Por favor proporciona una descripcion real.']
    },
    cosecha: {
        type: String,
        required: [true, 'Por favor proporciona la cosecha.']
    },
    precio: {
        type: Number,
        
    },
    fotos: { 
        type: [String],
        required: [true, 'Por favor sube al menos una imagen.']
    }
}, 
{ timestamps: true });

const Producto = mongoose.model('producto', productoSchema);

module.exports = { Producto, productoSchema };
