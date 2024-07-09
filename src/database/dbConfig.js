const { Pool } = require('pg');

// Configuración de la base de datos
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

// Función para probar la conexión
const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Conexión a la base de datos PostgreSQL establecida correctamente.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos PostgreSQL:', error);
    }
};

module.exports = { pool, connectDB };
