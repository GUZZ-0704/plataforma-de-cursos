const express = require('express');
const router = express.Router();

const {
    getUsuariosCursosController,
    getUsuarioCursoByIdController,
    getUsuarioCursoByUsuarioIdController,
    getUsuarioCursoByUsuarioIdCursoIdController,
    createUsuarioCursoController,
    updateUsuarioCursoController,
    deleteUsuarioCursoController
} = require('../controllers/usuario_cursoController');

router.get('/usuario_cursos', getUsuariosCursosController);
router.get('/usuario_cursos/:id', getUsuarioCursoByIdController);
router.get('/usuario_cursos/usuario/:id', getUsuarioCursoByUsuarioIdController);
router.get('/usuario_cursos/usuario/:idusuario/curso/:idcurso', getUsuarioCursoByUsuarioIdCursoIdController);
router.post('/usuario_cursos', createUsuarioCursoController);
router.put('/usuario_cursos/:id', updateUsuarioCursoController);
router.delete('/usuario_cursos/:id', deleteUsuarioCursoController);

module.exports = router;