const express = require('express');
const router = express.Router();

const {
    getLeccionesController,
    getLeccionByIdController,
    getLeccionesByCursoController,
    createLeccionController,
    createLeccionNoImagenController,
    createLeccionNoVideoController,
    createLeccionNoImagenNoVideoController,
    updateLeccionController,
    deleteLeccionController
} = require('../controllers/leccionController');

router.get('/lecciones', getLeccionesController);
router.get('/lecciones/:id', getLeccionByIdController);
router.get('/lecciones/curso/:idcurso', getLeccionesByCursoController);
router.post('/lecciones', createLeccionController);
router.post('/lecciones/noimagen', createLeccionNoImagenController);
router.post('/lecciones/novideo', createLeccionNoVideoController);
router.post('/lecciones/noimagennovideo', createLeccionNoImagenNoVideoController);
router.put('/lecciones/:id', updateLeccionController);
router.delete('/lecciones/:id', deleteLeccionController);

module.exports = router;

