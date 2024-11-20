
const Carrito = require('../models/carrito');

/**Aca creamos a un carrito */

module.exports.crearCarrito = (req, res) => {
    Carrito.create(req.body)
    .then((nuevoCarrito) => {
        return res.status(201).json(nuevoCarrito);
    })
    .catch((error) => {
        console.log(error.message);
        res.statusMessage = error.message;
        return res.status(400).json({message: error.message});
    });
 };



 module.exports.listarCarritos = (req, res) => {
    Carrito.find()
        .then((listarCarritos) => {
            return res.status(200).json(listarCarritos);
        })
        .catch((error) => {
            return res.status(400).json({message: error.message});
        });
    
};

module.exports.carritoID = (req, res) => {
    Carrito.findOne({_id : req.params._id})
       .then((carritoEncontrado) =>{
           if(!carritoEncontrado){
             res.statusMessage = 'Carrito no encontrado.'; 
             return res.status(404).json({mensaje: 'Carrito no encontrado.'})
           }
           return res.status(200).json(carritoEncontrado);
       })
       .catch((error) => {
           return res.status(400).json({message: error.message}); 
       });
};


module.exports.editarCarritoID = (req, res) => {
    const camposParaActualizar= {}; 
    const {cantidadProductos, montoTotal} = req.body;

    if(cantidadProductos){
        camposParaActualizar.cantidadProductos = cantidadProductos;
    }

    if(montoTotal){
          camposParaActualizar.montoTotal = montoTotal; 
    }


    Carrito.findOneAndUpdate({_id: req.params._id}, camposParaActualizar, {new: true})
       .then((carritoEditado) => {
           return res.status(200).json(carritoEditado);
        })
        .catch((error) => {
            return res.status(400).json({message: error.message});
        });
};




module.exports.eliminarCarrito = (req, res) => {
    Carrito.findOneAndDelete({_id: req.params._id})
    .then(() => {
        return res.status(204).end();
    })
    .catch((error) => {
        return res.status(400).json({message: error.message});
    });
};



/**Agregar el cargar productos a la lista */