
const express = require('express');
const routerUsuario = express.Router();
const UsuarioController = require('../controllers/usuarioControllers');
const validarToken= require('../middlewares/validarToken'); 

/**Login y registro */
routerUsuario.post('/login', UsuarioController.login); 
routerUsuario.post('/registrar', UsuarioController.agregarUsuario);

/** RUtas validadas con token */

routerUsuario.delete('/eliminarUsuario/:id', UsuarioController.eliminarUsuario); 
routerUsuario.put('/editarPerfil/:correo', UsuarioController.editarPerfil);
routerUsuario.get('/', UsuarioController.usuarios); 
routerUsuario.get('/:_id', UsuarioController.usuarioID);
routerUsuario.post("/favoritos/:_id", UsuarioController.agregarAFavoritos);


module.exports = routerUsuario; 