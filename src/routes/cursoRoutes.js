const express = require('express');
const router = express.Router();
const {
    getCursosController,
    getCursoByIdController,
    createCursoController,
    updateCursoController,
    deleteCursoController
} = require('../controllers/cursoController');
const { upload } = require('../models/curso'); // Asegúrate de que upload está correctamente exportado

router.get('/cursos', getCursosController);
router.get('/cursos/:id', getCursoByIdController);
router.post('/cursos', createCursoController); // Usamos upload.single('imagen') directamente
router.put('/cursos/:id', updateCursoController); // Para manejar actualizaciones de curso con archivos
router.delete('/cursos/:id', deleteCursoController);

module.exports = router;
