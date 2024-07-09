require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { connectDB } = require('./database/dbConfig');
const usuarioRoutes = require('./routes/usuarioRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const leccionRoutes = require('./routes/leccionRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const progresoRoutes = require('./routes/progresoRoutes');
const usuario_cursoRoutes = require('./routes/usuario_cursoRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middleware para analizar cuerpos de solicitud JSON
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, '../public')));

// Rutas de la API
app.use('/api', usuarioRoutes);
app.use('/api', cursoRoutes);
app.use('/api', leccionRoutes);
app.use('/api', categoriaRoutes);
app.use('/api', progresoRoutes);
app.use('/api', usuario_cursoRoutes);

// Ruta principal para servir el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
