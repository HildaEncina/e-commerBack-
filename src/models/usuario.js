const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { carritoSchema } = require('./carrito');
const { productoSchema } = require('./producto');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor proporciona el nombre.'],
        minLength: [3, 'Por favor proporciona un nombre real.']
    },
    apellido: {
        type: String,
        required: [true, 'Por favor proporcione su apellido'],
        minLength: [3, 'Por favor proporciona un apellido más largo']
    },
    edad: {
        type: Number,
        required: [true, 'Por favor proporciona la edad.']
    },
    email: {
        type: String,
        required: [true, 'Por favor proporcione su correo.'],
        unique: true, 
        minLength: [4, 'Por favor proporciona un correo real']
    },
    password: {
        type: String,
        required: [true, 'Por favor proporcione su contraseña'],
        minLength: [3, 'Por favor proporciona una contraseña más segura']
    },
    telefono: {
        type: Number,
        minLength: [9, 'Por favor proporciona un número de teléfono real']
    },
    domicilio: {
        type: String,
        required: [true, 'Por favor proporciona tu domicilio.'],
        minLength: [5, 'Por favor proporciona una ubicación real.']
    },
    rol: {
        type: String,
        required: [true],
        default: 'cliente'
    },
    foto: {
        type: String
    },
    carrito: carritoSchema,
    productos: [productoSchema], 
}, 
{ timestamps: true });

// **Middleware para cifrar contraseñas antes de guardar**
usuarioSchema.pre('save', async function (next) {
   
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next(); 
    } catch (error) {
        next(error);
    }
});

// Crear y exportar el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
