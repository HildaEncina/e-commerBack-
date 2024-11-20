const express = require('express');
const app = express();
const cors = require('cors');



require('./src/config/baseDatos'); 

const PORT = 8082;

const routerUsuario = require('./src/routes/routerUsuario');
const routerProducto = require('./src/routes/routerProducto');
const routerCarrito =require('./src/routes/routerCarrito')
const routerUsuario = require('./src/routes/routerUsuario');
const routerCarrito = require('./src/routes/routerCarrito');




// Configura middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Incluye las rutas desde otro archivo

app.use('/api/usuario', routerUsuario); 
app.use('/api/producto', routerProducto);
app.use('/api/carrito', routerCarrito);
app.use('/api/carrito', routerCarrito);


app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});


