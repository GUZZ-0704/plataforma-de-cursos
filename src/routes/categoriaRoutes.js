const express = require('express');
const router = express.Router();

const {
    getCategoriasController,
    getCategoriaByIdController,
    getCategoryIdController,
    createCategoriaController,
    updateCategoriaController,
    deleteCategoriaController
} = require('../controllers/categoriaController');

router.get('/categorias', getCategoriasController);
router.get('/categorias/:id', getCategoriaByIdController);
router.get('/categorias/nombre/:nombre', getCategoryIdController);
router.post('/categorias', createCategoriaController);
router.put('/categorias/:id', updateCategoriaController);
router.delete('/categorias/:id', deleteCategoriaController);

module.exports = router;
