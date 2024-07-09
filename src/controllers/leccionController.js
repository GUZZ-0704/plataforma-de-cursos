const {
    getLecciones,
    getLeccionById,
    getLeccionesByCurso,
    createLeccion,
    createLeccionNoImagen,
    createLeccionNoVideo,
    createLeccionNoImagenNoVideo,
    updateLeccion,
    deleteLeccion
} = require('../models/leccion');

const getLeccionesController = async (req, res) => {
    await getLecciones(req, res);
}

const getLeccionByIdController = async (req, res) => {
    await getLeccionById(req, res);
}

const getLeccionesByCursoController = async (req, res) => {
    await getLeccionesByCurso(req, res);
}

const createLeccionController = async (req, res) => {
    await createLeccion(req, res);
}

const createLeccionNoImagenController = async (req, res) => {
    await createLeccionNoImagen(req, res);
}

const createLeccionNoVideoController = async (req, res) => {
    await createLeccionNoVideo(req, res);
}

const createLeccionNoImagenNoVideoController = async (req, res) => {
    await createLeccionNoImagenNoVideo(req, res);
}

const updateLeccionController = async (req, res) => {
    await updateLeccion(req, res);
}

const deleteLeccionController = async (req, res) => {
    await deleteLeccion(req, res);
}

module.exports = {
    getLeccionesController,
    getLeccionByIdController,
    getLeccionesByCursoController,
    createLeccionController,
    createLeccionNoImagenController,
    createLeccionNoVideoController,
    createLeccionNoImagenNoVideoController,
    updateLeccionController,
    deleteLeccionController
};