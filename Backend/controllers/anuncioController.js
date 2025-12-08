const AnuncioModel = require('../models/anuncioModel');

const anuncioController = {

  listar: async (req, res) => {
    try {
      const anuncios = await AnuncioModel.listar();
      res.json(anuncios);
    } catch (error) {
      res.status(500).json({ error: { message: 'Error al listar los anuncios' } });
    }
  },

  obtenerPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const anuncio = await AnuncioModel.obtenerPorId(id);

      if (!anuncio) {
        return res.status(404).json({ error: { message: 'Anuncio no encontrado' } });
      }

      res.json(anuncio);
    } catch (error) {
      res.status(500).json({ error: { message: 'Error al obtener el anuncio' } });
    }
  },

  crear: async (req, res) => {
    try {
      const anuncio = req.body;
      const nuevo = await AnuncioModel.crear(anuncio);
      res.status(201).json(nuevo);
    } catch (error) {
      res.status(400).json({ error: { message: error.message || 'Error al crear el anuncio' } });
    }
  },

  actualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const datos = req.body;
      const actualizado = await AnuncioModel.actualizar(id, datos);
      res.json(actualizado);
    } catch (error) {
      res.status(400).json({ error: { message: error.message || 'Error al actualizar el anuncio' } });
    }
  },

  eliminar: async (req, res) => {
    try {
      const { id } = req.params;
      await AnuncioModel.eliminar(id);
      res.json({ message: 'Anuncio eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: { message: 'Error al eliminar el anuncio' } });
    }
  }

};

module.exports = anuncioController;
