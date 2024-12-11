const Usuario = require("../models/usuario");
const jwt = require("jsonwebtoken");
const clave = "vinoteca";
const bcrypt = require("bcrypt");

/**Agregar Usuario */
module.exports.agregarUsuario = (req, res) => {
  Usuario.create(req.body)
    .then((nuevoUsuario) => {
      const infoEnToken = {
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        edad: nuevoUsuario.edad,
        email: nuevoUsuario.email,
        telefono: nuevoUsuario.telefono,
        domicilio: nuevoUsuario.ciudad,
        rol: nuevoUsuario.rol,
      };

      jwt.sign(infoEnToken, clave, { expiresIn: "1m" }, (error, token) => {
        if (error) {
          return res.status(400).json({ mensaje: "Error al generar el token" });
        }

        return res.status(200).json({ token });
      });
    })
    .catch((error) => {
      console.log(error.message);
      res.statusMessage = error.message;
      return res.status(400).json(error.message);
    });
};

/**Listar Usuarios */
module.exports.usuarios = (req, res) => {
  console.log(req.infoUsuario);
  Usuario.find()
  .then((listaUsuarios) => {
    return res.status(200).json(listaUsuarios);
  }).catch((error) => {
    return res.status(400).json({message: error.message});
  });
};

/** Devuelve un usuario por ID */
module.exports.usuarioID = (req, res) => {
  Usuario.findOne({ _id: req.params._id })
    .then((usuarioEncontrado) => {
      if (!usuarioEncontrado) {
        res.statusMessage = "Usuario no encontrado.";
        return res.status(404).json({ mensaje: "Usuario no encontrado." });
      }
      return res.status(200).json(usuarioEncontrado);
    })
    .catch((error) => {
      return res.status(400).json({ message: error.message });
    });
};

/** Editar usuario */
module.exports.editarPerfil = (req, res) => {
 

  const camposParaActualizar = {};
  const { nombre, apellido, edad, password, telefono, domicilio, foto, email } = req.body; 

  // Validar que el email esté presente
  if (!email) {
      return res.status(400).json({ mensaje: 'El email es obligatorio para la actualización.' });
  }

  if (nombre) {
      camposParaActualizar.nombre = nombre;
  }

  if (apellido) {
      camposParaActualizar.apellido = apellido;
  }

  if (edad) {
      camposParaActualizar.edad = edad; 
  }

  if (password) {
      camposParaActualizar.password = password; 
  }

  if (telefono) {
      camposParaActualizar.telefono = telefono;
  }

  if (domicilio) {
      camposParaActualizar.domicilio = domicilio; 
  }

  if (foto) {
      camposParaActualizar.foto = foto; 
  }

  // Actualizar el usuario utilizando el email del cuerpo de la solicitud
  Usuario.findOneAndUpdate({ email: email }, camposParaActualizar, { new: true })
      .then((usuarioActualizado) => {
          if (!usuarioActualizado) {
              return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
          }
          return res.status(200).json(usuarioActualizado);
      })
      .catch((error) => {
          console.error("Error al actualizar el usuario:", error);
          return res.status(400).json({ mensaje: 'Error al actualizar el usuario', error });
      });
};


module.exports.agregarCarrito = (req, res) => {
    const { id } = req.params; 
    const {carrito } = req.body;  

    const updateData = {};
    if (carrito) updateData.carrito = carrito;

  Usuario.findByIdAndUpdate(id, updateData, { new: true })
    .then((usuarioActualizado) => {
      res.status(200).json(usuarioActualizado);
    })
    .catch((error) => {
      res
        .status(400)
        .json({ mensaje: "Error al actualizar el usuario", error });
    });
};


module.exports.eliminarUsuario = (req, res) => {
  const userId = req.params.id; 
  Usuario.findByIdAndDelete(userId) 
    .then(() => {
      return res.status(202).json({ message: "Se eliminó exitosamente" });
    })
    .catch((error) => {
      return res.status(400).json({ message: error.message });
    });
};


/**Login */

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuarioEncontrado = await Usuario.findOne({ email });
    if (!usuarioEncontrado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      usuarioEncontrado.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }
    const infoEnToken = {
      id: usuarioEncontrado._id,
      rol: usuarioEncontrado.rol,
    };

    const token = jwt.sign(infoEnToken, clave, { expiresIn: "1m" });
    return res.status(200).json({ token });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error interno del servidor", error });
  }
};

/**Agregamos un favorito */

module.exports.agregarAFavoritos = async (req, res) => {
  console.log("soy el req", req.params._id)
  const { producto } = req.body;
 const productoId=  producto._id; 

  try {
    const usuario = await Usuario.findById( req.params._id);
    console.log("Usuario encontrado ", usuario)
    const productos = usuario.productos;
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    
    const productoEncontrado = productos.find(producto => producto._id.toString() === productoId.toString());

    if(!productoEncontrado){ 
       usuario.productos.push(producto);

  
    await usuario.save(); }

    return res.status(200).json({ mensaje: "Producto agregado a favoritos", usuario});
  } catch (error) {
    console.error("Error al agregar producto a favoritos:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor", error });
  }
};
