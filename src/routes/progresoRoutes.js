const express = require('express');
const router = express.Router();

const {
    getProgresosController,
    getProgresoByIdController,
    getProgresoByUsuarioController,
    getProgresoByLeccionController,
    getProgresoByUsuarioCursoController,
    getProgresoByUsuarioLeccionController,
    createProgresoController,
    updateProgresoController,
    deleteProgresoController
} = require('../controllers/progresoController');

router.get('/progresos', getProgresosController);
router.get('/progresos/:id', getProgresoByIdController);
router.get('/progresos/usuario/:id', getProgresoByUsuarioController);
router.get('/progresos/leccion/:id', getProgresoByLeccionController);
router.get('/progresos/usuario-curso/:usuario/:curso', getProgresoByUsuarioCursoController);
router.get('/progresos/usuario-leccion/:usuario/:leccion', getProgresoByUsuarioLeccionController);
router.post('/progresos', createProgresoController);
router.put('/progresos/:id', updateProgresoController);
router.delete('/progresos/:id', deleteProgresoController);

module.exports = router;