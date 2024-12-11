const express = require('express');
const routerProducto = express.Router();
const productoController = require('../controllers/productoControllers'); 



routerProducto.post('/crear', productoController.crearProducto); 
routerProducto.delete('/eliminar/:_id', productoController.eliminarProducto); 
routerProducto.get('/listar', productoController.listarProductos); 
routerProducto.get('/:_id', productoController.productoID); 
routerProducto.put('/editar/:_id', productoController.editarProducto); 


module.exports= routerProducto;
