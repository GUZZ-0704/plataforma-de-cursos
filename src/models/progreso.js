const { pool } = require('../database/dbConfig');

const getProgresos = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM progreso');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener los progresos:', error);
    }
}

const getProgresoById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM progreso WHERE id = $1', [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener el progreso:', error);
    }
}

const getProgresoByUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM progreso WHERE usuario_id = $1', [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener el progreso:', error);
    }
}

const getProgresoByLeccion = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM progreso WHERE leccion_id = $1', [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener el progreso:', error);
    }
}

const getProgresoByUsuarioCurso = async (req, res) => {
    try {
        const { idusuario, idcurso } = req.body;
        const response = await pool.query('SELECT * FROM progreso WHERE usuario_id = $1 AND leccion_id IN (SELECT id FROM leccion WHERE curso_id = $2)', [idusuario, idcurso]);
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener el progreso:', error);
    }
}

const getProgresoByUsuarioLeccion = async (req, res) => {
    try {
        const idusuario = req.params.usuario;
        const idleccion = req.params.leccion;
        const response = await pool.query('SELECT * FROM progreso WHERE usuario_id = $1 AND leccion_id = $2', [idusuario, idleccion]);
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener el progreso:', error);
    }

}

const createProgreso = async (req, res) => {
    try {
        const { idusuario, idleccion } = req.body;
        await pool.query('INSERT INTO progreso (usuario_id, leccion_id) VALUES ($1, $2)', [idusuario, idleccion]);
        res.status(200).json({
            message: 'Progreso creado correctamente',
            body: {
                progreso: { idusuario, idleccion }
            }
        });
    } catch (error) {
        console.error('Error al crear el progreso:', error);
    }
}

const updateProgreso = async (req, res) => {
    try {
        const id = req.params.id;
        const { idusuario, idleccion, completado } = req.body;
        await pool.query('UPDATE progreso SET usuario_id = $1, leccion_id = $2, visto = $3 WHERE id = $4', [idusuario, idleccion, completado, id]);
        res.status(200).json({
            message: 'Progreso actualizado correctamente',
            body: {
                progreso: { idusuario, idleccion, completado }
            }
        });
    } catch (error) {
        console.error('Error al actualizar el progreso:', error);
    }
}

const deleteProgreso = async (req, res) => {
    try {
        const id = req.params.id;
        await pool.query('DELETE FROM progreso WHERE id = $1', [id]);
        res.status(200).json({
            message: 'Progreso eliminado correctamente',
            body: {
                progreso: {id}
            }
        });
    } catch (error) {
        console.error('Error al eliminar el progreso:', error);
    }
}

module.exports = {
    getProgresos,
    getProgresoById,
    getProgresoByUsuario,
    getProgresoByLeccion,
    getProgresoByUsuarioCurso,
    getProgresoByUsuarioLeccion,
    createProgreso,
    updateProgreso,
    deleteProgreso
};