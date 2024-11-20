const express = require('express');
const routerProducto = express.Router();
const productoController = require('../controllers/productoControllers'); 



routerProducto.post('/crear', productoController.crearProducto); 
routerProducto.delete('/eliminar/:id', productoController.eliminarProducto); 
routerProducto.get('/listar', productoController.listarProductos); 
routerProducto.get('/:id', productoController.productoID); 
routerProducto.put('/editar/:id', productoController.editarProducto); 


module.exports= routerProducto;
