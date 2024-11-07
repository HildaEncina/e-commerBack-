const express = require('express');
const app = express();
const cors = require('cors');

require('./src/config/baseDatos'); 

const PORT = 3000;

const routerUsuario = require('./src/routes/rutaUsuario');



// Configura middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Incluye las rutas desde otro archivo

app.use('/api/usuario', routerUsuario); 

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
