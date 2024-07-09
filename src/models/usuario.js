const { pool } = require('../database/dbConfig');

const getUsuarios = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM usuario');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
    }
}

const getUsuarioById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
    }
}

const getUsuarioByEmail = async (email) => {
    try {
        const response = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);
        return response.rows[0];
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
    }

}
const createUsuario = async (req, res) => {
    try {
        const { nombre, email, password} = req.body;
        const rol = 'estudiante';
        // Aquí corregimos la sintaxis de la llamada a la función
        const response = await pool.query('SELECT registrar_usuario($1, $2, $3, $4)', [nombre, email, password, rol]);
        res.status(200).json({
            message: 'Usuario creado correctamente',
            body: {
                usuario: { nombre, email, password, rol}
            }
        });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
    }
}

const updateUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, email, password } = req.body;
        const response = await pool.query('UPDATE usuario SET nombre = $2, email = $3, password = $4 WHERE id = $1 RETURNING *', [id, nombre, email, password]);
        res.status(200).json({
            message: 'Usuario actualizado correctamente',
            body: {
                usuario: { nombre, email, password }
            }
        });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
    }
}

const deleteUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM usuario WHERE id = $1', [id]);
        res.status(200).json({
            message: 'Usuario eliminado correctamente',
            body: {
                usuario: { id }
            }
        });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
    }
}

const getCategoryNameById = async (id) => {
    try {
        const response = await pool.query('SELECT nombre FROM categoria WHERE id = $1', [id]);
        return response.rows[0].nombre;
    } catch (error) {
        console.error('Error al obtener el nombre de la categoría:', error);
    }

}

module.exports = {
    getUsuarios,
    getUsuarioById,
    getUsuarioByEmail,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getCategoryNameById
};
