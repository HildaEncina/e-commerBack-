const Producto = require('../models/producto');

module.exports.crearProducto = (req, res) => {
    Producto.create(req.body)
    .then((nuevoProducto) => {
        return res.status(201).json(nuevoProducto);
    })
    .catch((error) => {
        console.log(error.message);
        res.statusMessage = error.message;
        return res.status(400).json({message: error.message});
    });
 };

 module.exports.listarProductos = (req, res) => {
    Producto.find()
        .then((listarProductos) => {
            return res.status(200).json(listarProductos);
        })
        .catch((error) => {
            return res.status(400).json({message: error.message});
        });
    
};

module.exports.productoID = (req, res) => {
    Producto.findOne({_id : req.params._id})
       .then((productoEncontrado) =>{
           if(!productoEncontrado){
             res.statusMessage = 'Producto no encontrado.'; 
             return res.status(404).json({mensaje: 'Producto no encontrado.'})
           }
           return res.status(200).json(productoEncontrado);
       })
       .catch((error) => {
           return res.status(400).json({message: error.message}); 
       });
};

module.exports.editarProducto = (req, res) => {
    const camposParaActualizar= {}; 
    const {marca, tipo, descripcion,cosecha,precio} = req.body;

    if(marca){
        camposParaActualizar.marca = marca;
    }

    if(tipo){
          camposParaActualizar.tipo = tipo; 
    }

    if(descripcion){
        camposParaActualizar.descripcion = descripcion; 
  }
  if(cosecha){
    camposParaActualizar.cosecha = cosecha; 
   }
   if(precio){
    camposParaActualizar.precio = precio; 
   }

    Producto.findOneAndUpdate({_id: req.params._id}, camposParaActualizar, {new: true})
       .then((productoEditado) => {
           return res.status(200).json(productoEditado);
        })
        .catch((error) => {
            return res.status(400).json({message: error.message});
        });
};


module.exports.eliminarProducto = (req, res) => {
    Producto.findOneAndDelete({_id: req.params._id})
    .then(() => {
        return res.status(204).end();
    })
    .catch((error) => {
        return res.status(400).json({message: error.message});
    });
};



