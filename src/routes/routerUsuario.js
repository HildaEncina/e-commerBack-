
const express = require('express');
const routerUsuario = express.Router();
const UsuarioController = require('../controllers/usuarioControllers');
const validarToken= require('../middlewares/validarToken'); 

/**Login y registro */
routerUsuario.post('/login', UsuarioController.login); 
routerUsuario.post('/registrar', UsuarioController.agregarUsuario);

/** RUtas validadas con token */

routerUsuario.delete('/eliminarUsuario/:correo', validarToken, UsuarioController.removerUsuario); 
routerUsuario.put('/editarPerfil/:correo', validarToken, UsuarioController.editarPerfil);
routerUsuario.get('/', validarToken, UsuarioController.usuarios); 
routerUsuario.get('/:_id', UsuarioController.usuarioID);



module.exports = routerUsuario; 