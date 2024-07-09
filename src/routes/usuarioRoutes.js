const express = require('express');
const router = express.Router();
const {
    getUsuariosController,
    getUsuarioByIdController,
    createUsuarioController,
    updateUsuarioController,
    deleteUsuarioController,
    loginUsuarioController,
    getCategoryNameByIdController
} = require('../controllers/usuarioController');

router.get('/usuarios', getUsuariosController);
router.get('/usuarios/:id', getUsuarioByIdController);
router.post('/usuarios', createUsuarioController);
router.put('/usuarios/:id', updateUsuarioController);
router.delete('/usuarios/:id', deleteUsuarioController);
router.post('/login', loginUsuarioController);
router.get('/categorias/:id', getCategoryNameByIdController);

module.exports = router;