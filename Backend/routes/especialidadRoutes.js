const express = require('express');
const router = express.Router();
const especialidadController = require('../controllers/especialidadController');

router.get('/', especialidadController.listar);
router.get('/:id', especialidadController.obtenerPorId);
router.post('/', especialidadController.crear);
router.put('/:id', especialidadController.actualizar);
router.delete('/:id', especialidadController.eliminar);

module.exports = router;
