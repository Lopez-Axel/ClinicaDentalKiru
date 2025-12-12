const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');

router.get('/', citaController.listar);
router.get('/:id', citaController.obtenerPorId);
router.post('/', citaController.crear);
router.put('/:id', citaController.actualizar);
router.delete('/:id', citaController.eliminar);

module.exports = router;
