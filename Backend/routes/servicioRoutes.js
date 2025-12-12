const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicioController');
const upload = require('../middlewares/upload');

router.get('/', servicioController.listar);
router.get('/:id', servicioController.obtenerPorId);
router.post('/', upload.single('imagen'), servicioController.crear);
router.put('/:id', upload.single('imagen'), servicioController.actualizar);
router.delete('/:id', servicioController.eliminar);

module.exports = router;
