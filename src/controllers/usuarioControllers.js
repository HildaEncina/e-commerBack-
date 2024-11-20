
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken'); 
const clave='vinoteca';
const bcrypt = require('bcrypt');


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

           
            jwt.sign(infoEnToken, clave, {expiresIn: '1m'}, (error, token) => {
                if (error) {
                    
                    return res.status(400).json({mensaje: 'Error al generar el token'});
                }
               
                return res.status(200).json({token});
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
      then((listaUsuarios) => {
        return res.stauts(200).json(listaUsuarios); 
      })
      .catch((error) => {
        return res.status(400).json(error); 
      }); 
}; 


/** Devuelve un usuario por ID */
module.exports.usuarioID = (req, res) => {
    Usuario.findOne({_id : req.params._id})
       .then((usuarioEncontrado) =>{
           if(!usuarioEncontrado){
             res.statusMessage = 'Usuario no encontrado.'; 
             return res.status(404).json({mensaje: 'Usuario no encontrado.'})
           }
           return res.status(200).json(usuarioEncontrado);
       })
       .catch((error) => {
           return res.status(400).json({message: error.message}); 
       });
};
       

/**Editar usuario */
module.exports.actualizarUsuario = (req, res) => {
     const camposParaActualizar = {}; 
     const {nombre, apellido, edad, email, clave, telefono, domicilio} = req.body; 

     if(nombre) {
        camposParaActualizar.nombre = nombre; 
     }

     if(apellido){
        camposParaActualizar.apellido = apellido; 
     }

     if(edad){
        camposParaActualizar.edad = edad; 
     }

     if(email){
        camposParaActualizar.email = email;
     }
     
     if(clave) {
        camposParaActualizar.clave = clave; 
     }

     if(telefono){
         camposParaActualizar.telefono = telefono ; 
     }

     if(domicilio) {
        camposParaActualizar.domicilio = domicilio; 
     }
    
     Usuario.findOneAndUpdate({email: req.infoUsuario.email}, camposParaActualizar, {new: true})
        .then((usuarioActualizado) => {
            return res.status(200).json(usuarioActualizado);
        })
        .catch((error) => {
            return res.status(400).json(error);
        });

}

module.exports.actualizarUsuario = (req, res) => {
    const { id } = req.params; 
    const { avatar, carrito } = req.body;  

    const updateData = {};
    if (avatar) updateData.avatar = avatar;
    if (carrito) updateData.carrito = carrito;

    Usuario.findByIdAndUpdate(id, updateData, { new: true })
        .then((usuarioActualizado) => {
            res.status(200).json(usuarioActualizado);
        })
        .catch((error) => {
            res.status(400).json({ mensaje: 'Error al actualizar el usuario', error });
        });
};


/**Eliminar Usuario */
module.exports.removerUsuario = (req, res) => {
    Usuario.findOneAndDelete({correo: req.infoUsuario.correo})
        .then(() => {
            return res.status(204).end();
        })
        .catch((error) => {
            return res.status(400).json(error);
        });
};






/**Login */

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const usuarioEncontrado = await Usuario.findOne({ email });
      if (!usuarioEncontrado) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, usuarioEncontrado.password);
      if (!isPasswordValid) {
        return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        
      }
      const infoEnToken = {
        id: usuarioEncontrado._id,
        rol: usuarioEncontrado.rol,
      };
  
      
  
      const token = jwt.sign(infoEnToken, clave, { expiresIn: '1m' });
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error interno del servidor', error });
    }
  };
  