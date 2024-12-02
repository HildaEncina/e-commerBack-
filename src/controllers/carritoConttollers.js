
const {Carrito } = require('../models/carrito');

/**Aca creamos a un carrito */

module.exports.crearCarrito = (req, res) => {
    Carrito.create(req.body)
    .then((nuevoCarrito) => {
        return res.status(201).json(nuevoCarrito._id);
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
    Carrito.findOne({_id : req.params.id})
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


module.exports.editarCarritoID = async (req, res) => {
  // Suponiendo que el producto a agregar se envía en el cuerpo
    const carritoId = req.params.id;
    console.log("Datos recibidos Ahora:", req.body);
    console.log("ID del carrito:", req.params.id);
    console.log("ID del producto:", );
    const precio = req.body.producto.precio;
    producto= {
        _id: req.body.producto.id,
        marca: req.body.producto.marca, 
        tipo: req.body.producto.tipo,
        descripcion: req.body.producto.descripcion,
        cosecha: req.body.producto.cosecha,
        precio: req.body.producto.precio,
        fotos: req.body.producto.fotos
   }
   console.log("SOy producto", producto)
    try {
        // Obtener el carrito actual
        const carrito = await Carrito.findById(carritoId);
        if (!carrito) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        // Agregar el nuevo producto al array de productos
        carrito.productos.push(producto); // Añadir el nuevo producto
        carrito.cantidadProductos += 1;
        
        const precioFinal= precio;
        console.log(precio);
        console.log(typeof precioFinal);

        carrito.montoTotal += precioFinal; 
      
        // Guardar los cambios
        const carritoEditado = await carrito.save();

        return res.status(200).json(carritoEditado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
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



