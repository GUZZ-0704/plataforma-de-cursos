const { pool } = require('../database/dbConfig');

const getCategorias = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM categoria');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener las categorias:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const getCategoryIdByName = async (nombre) => {
    try {
        console.log('Nombre recibido para consulta:', nombre);
        const trimmedNombre = nombre.trim();
        console.log('Nombre después de trim:', trimmedNombre);

        const response = await pool.query('SELECT id FROM categoria WHERE nombre = $1', [trimmedNombre]);
        if (response.rows.length === 0) {
            throw new Error('Categoría no encontrada');
        }
        return response.rows[0].id;
    } catch (error) {
        console.error('Error al obtener el id de la categoria:', error);
        throw error;
    }
}

const getCategoriaById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM categoria WHERE id = $1', [id]);
        if (response.rows.length === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener la categoria:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const createCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;
        await pool.query('INSERT INTO categoria (nombre) VALUES ($1)', [nombre]);
        res.status(201).json({
            message: 'Categoria creada correctamente',
            body: {
                categoria: { nombre }
            }
        });
    } catch (error) {
        console.error('Error al crear la categoria:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const updateCategoria = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre } = req.body;
        await pool.query('UPDATE categoria SET nombre = $1 WHERE id = $2', [nombre, id]);
        res.status(200).json({
            message: 'Categoria actualizada correctamente',
            body: {
                categoria: { nombre }
            }
        });
    } catch (error) {
        console.error('Error al actualizar la categoria:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const deleteCategoria = async (req, res) => {
    try {
        const id = req.params.id;
        await pool.query('DELETE FROM categoria WHERE id = $1', [id]);
        res.status(200).json({
            message: 'Categoria eliminada correctamente',
            body: {
                categoria: { id }
            }
        });
    } catch (error) {
        console.error('Error al eliminar la categoria:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    getCategorias,
    getCategoriaById,
    getCategoryIdByName,
    createCategoria,
    updateCategoria,
    deleteCategoria
};
