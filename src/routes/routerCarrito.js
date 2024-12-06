const express = require('express');
const routerCarrito = express.Router();
const carritoController = require('../controllers/carritoConttollers'); 



routerCarrito.post('/crear', carritoController.crearCarrito); 

routerCarrito.delete('/eliminar/:id', carritoController.eliminarCarrito); 
routerCarrito.get('/listar', carritoController.listarCarritos); 
routerCarrito.get('/:id', carritoController.carritoID); 
routerCarrito.put('/editar/:id', carritoController.editarCarritoID); 
routerCarrito.delete('/eliminar-producto/:_id', carritoController.eliminarProductoCarrito);

module.exports = routerCarrito; 