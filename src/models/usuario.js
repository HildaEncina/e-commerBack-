const mongoose = require('mongoose');

const {carritoSchema} = require('./carrito')

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor proporciona el nombre.'],
        minLength: [3, 'Por favor proporciona un nombre real.']
    },
    apellido:{
        type: String,
        required: [true, 'Por favor proporcione su apellido'],
        minLength: [3, 'Por favor proporciona un apellido mas largo']
    },
    edad:{
        type: Number,
        required: [true, 'Por favor proporciona la edad.'],
    },
    email:{
        type: String,
        required: [true, 'Por favor proporcione su correo.'],
        minLength: [4, 'Por favor proporciona un correo real']
    },
    clave:{
        type: String,
        required: [true, 'Por favor proporcione su contrasena'],
        minLength: [3, 'Por favor proporciona una contraseña mas segura']
    },
    telefono:{
        type: Number,
        minLength: [9, 'Por favor proporciona un numero de telefono real']
    },
    domicilio:{
        type: String,
        required: [true, 'Por favor proporciona el nombre.'],
        minLength: [5, 'Por favor proporciona una ubicación real.']
    }, 
    rol:{
        type: String,
        required: [true],

    }, 
    avatar:{
        type: String
    },
    carrito: [carritoSchema]
},
{timestamps: true});

const Usuario = mongoose.model('usuario', usuarioSchema); 

module.exports = Usuario; 