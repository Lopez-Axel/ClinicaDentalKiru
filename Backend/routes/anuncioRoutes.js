const express = require('express');
const router = express.Router();
const anuncioController = require('../controllers/anuncioController');

// CRUD de anuncios
router.get('/', anuncioController.listar);
router.get('/:id', anuncioController.obtenerPorId);
router.post('/', anuncioController.crear);
router.put('/:id', anuncioController.actualizar);
router.delete('/:id', anuncioController.eliminar);

module.exports = router;
