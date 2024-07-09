const {
    getCursos,
    getCursoById,
    createCurso,
    updateCurso,
    deleteCurso
} = require('../models/curso');

const getCursosController = async (req, res) => {
    await getCursos(req, res);
}

const getCursoByIdController = async (req, res) => {
    await getCursoById(req, res);
}

const createCursoController = async (req, res) => {
    await createCurso(req, res);
}

const updateCursoController = async (req, res) => {
    await updateCurso(req, res);
}

const deleteCursoController = async (req, res) => {
    await deleteCurso(req, res);
}

module.exports = {
    getCursosController,
    getCursoByIdController,
    createCursoController,
    updateCursoController,
    deleteCursoController
};
