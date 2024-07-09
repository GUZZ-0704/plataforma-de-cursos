const {
    getProgresos,
    getProgresoById,
    getProgresoByUsuario,
    getProgresoByLeccion,
    getProgresoByUsuarioCurso,
    getProgresoByUsuarioLeccion,
    createProgreso,
    updateProgreso,
    deleteProgreso
} = require('../models/progreso');

const getProgresosController = async (req, res) => {
    await getProgresos(req, res);
}

const getProgresoByIdController = async (req, res) => {
    await getProgresoById(req, res);
}

const getProgresoByUsuarioController = async (req, res) => {
    await getProgresoByUsuario(req, res);
}

const getProgresoByLeccionController = async (req, res) => {
    await getProgresoByLeccion(req, res);
}

const getProgresoByUsuarioCursoController = async (req, res) => {
    await getProgresoByUsuarioCurso(req, res);
}

const getProgresoByUsuarioLeccionController = async (req, res) => {
    await getProgresoByUsuarioLeccion(req, res);
}

const createProgresoController = async (req, res) => {
    await createProgreso(req, res);
}

const updateProgresoController = async (req, res) => {
    await updateProgreso(req, res);
}

const deleteProgresoController = async (req, res) => {
    await deleteProgreso(req, res);
}

module.exports = {
    getProgresosController,
    getProgresoByIdController,
    getProgresoByUsuarioController,
    getProgresoByLeccionController,
    getProgresoByUsuarioCursoController,
    getProgresoByUsuarioLeccionController,
    createProgresoController,
    updateProgresoController,
    deleteProgresoController
};