const {
    getCategorias,
    getCategoriaById,
    getCategoryIdByName,
    createCategoria,
    updateCategoria,
    deleteCategoria
} = require('../models/categoria');

const getCategoriasController = async (req, res) => {
    await getCategorias(req, res);
}

const getCategoriaByIdController = async (req, res) => {
    await getCategoriaById(req, res);
}

const getCategoryIdController = async (req, res) => {
    try {
        const nombre = req.params.nombre;
        console.log('Nombre recibido en controlador:', nombre); // Añadir log para verificar el nombre recibido
        const id = await getCategoryIdByName(nombre);
        res.status(200).json({
            message: 'ID de la categoría obtenido correctamente',
            body: {
                id
            }
        });
    } catch (error) {
        console.error('Error en el controlador al obtener el id de la categoria:', error);
        res.status(404).json({
            message: 'Categoría no encontrada',
            error: error.message
        });
    }
}

const createCategoriaController = async (req, res) => {
    await createCategoria(req, res);
}

const updateCategoriaController = async (req, res) => {
    await updateCategoria(req, res);
}

const deleteCategoriaController = async (req, res) => {
    await deleteCategoria(req, res);
}

module.exports = {
    getCategoriasController,
    getCategoriaByIdController,
    getCategoryIdController,
    createCategoriaController,
    updateCategoriaController,
    deleteCategoriaController
};
