const jwt = require('jsonwebtoken'); 
const clave = 'vinoteca'; 

const validarToken = (req, res, next) => {
    const token_usuario = req.headers.token_usuario; 

    jwt.verify(token_usuario, clave, (error, decodificado) => {
        if(error){
            return res.status(401).json({mensaje: "No autorizado para ver este contenido"}); 
        }
        
        req.infoUsuario = {
            id: decodificado._id,
            nombre: decodificado.nombre,
            apellido: decodificado.apellido,
            email: decodificado.correo,
            rol: decodificado.rol
        }

        next(); 
    })
}

module.exports = validarToken; 