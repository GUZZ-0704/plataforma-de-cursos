const {
    getUsuariosCursos,
    getUsuarioCursoById,
    getUsuarioCursoByUsuarioId,
    getUsuarioCursoByUsuarioIdCursoId,
    createUsuarioCurso,
    updateUsuarioCurso,
    deleteUsuarioCurso
} = require('../models/usuario_curso');

const getUsuariosCursosController = async (req, res) => {
    await getUsuariosCursos(req, res);
}

const getUsuarioCursoByIdController = async (req, res) => {
    await getUsuarioCursoById(req, res);
}

const getUsuarioCursoByUsuarioIdController = async (req, res) => {
    await getUsuarioCursoByUsuarioId(req, res);
}

const getUsuarioCursoByUsuarioIdCursoIdController = async (req, res) => {
    await getUsuarioCursoByUsuarioIdCursoId(req, res);
}

const createUsuarioCursoController = async (req, res) => {
    await createUsuarioCurso(req, res);
}

const updateUsuarioCursoController = async (req, res) => {
    await updateUsuarioCurso(req, res);
}

const deleteUsuarioCursoController = async (req, res) => {
    await deleteUsuarioCurso(req, res);
}

module.exports = {
    getUsuariosCursosController,
    getUsuarioCursoByIdController,
    getUsuarioCursoByUsuarioIdController,
    getUsuarioCursoByUsuarioIdCursoIdController,
    createUsuarioCursoController,
    updateUsuarioCursoController,
    deleteUsuarioCursoController
};