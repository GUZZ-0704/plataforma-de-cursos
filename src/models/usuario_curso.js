const { pool } = require('../database/dbConfig');

const getUsuariosCursos = async (req, res) => {
    try {
        const usuariosCursos = await pool.query('SELECT * FROM usuario_curso');
        res.json(usuariosCursos.rows);
    } catch (error) {
        console.error(error.message);
    }
}

const getUsuarioCursoById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioCurso = await pool.query('SELECT * FROM usuario_curso WHERE id = $1', [id]);
        res.json(usuarioCurso.rows);
    } catch (error) {
        console.error(error.message);
    }
}

const getUsuarioCursoByUsuarioId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioCurso = await pool.query('SELECT * FROM usuario_curso WHERE usuario_id = $1', [id]);
        res.json(usuarioCurso.rows);
    } catch (error) {
        console.error(error.message);
    }
}

const getUsuarioCursoByUsuarioIdCursoId = async (req, res) => {
    try {
        const { idusuario, idcurso } = req.params;
        const usuarioCurso = await pool.query('SELECT * FROM usuario_curso WHERE usuario_id = $1 AND curso_id = $2', [idusuario, idcurso]);
        res.json(usuarioCurso.rows);
    } catch (error) {
        console.error(error.message);
    }
}

const createUsuarioCurso = async (req, res) => {
    try {
        const { idusuario, idcurso } = req.body;
        const newUsuarioCurso = await pool.query('INSERT INTO usuario_curso (usuario_id, curso_id) VALUES ($1, $2) RETURNING *', [idusuario, idcurso]);
        res.json(newUsuarioCurso.rows);
    } catch (error) {
        console.error(error.message);
    }
}

const updateUsuarioCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const { idusuario, idcurso } = req.body;
        const updatedUsuarioCurso = await pool.query('UPDATE usuario_curso SET usuario_id = $1, curso_id = $2 WHERE id = $3 RETURNING *', [idusuario, idcurso, id]);
        res.json(updatedUsuarioCurso.rows);
    } catch (error) {
        console.error(error.message);
    }
}

const deleteUsuarioCurso = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM usuario_curso WHERE id = $1', [id]);
        res.json('UsuarioCurso eliminado correctamente');
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    getUsuariosCursos,
    getUsuarioCursoById,
    getUsuarioCursoByUsuarioId,
    getUsuarioCursoByUsuarioIdCursoId,
    createUsuarioCurso,
    updateUsuarioCurso,
    deleteUsuarioCurso
};