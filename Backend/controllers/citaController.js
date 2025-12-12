const CitaModel = require('../models/citaModel');

const citaController = {

  listar: async (req, res) => {
    try {
      const citas = await CitaModel.listar();
      res.json(citas);
    } catch (error) {
      res.status(500).json({ error: { message: 'Error al listar las citas' } });
    }
  },

  obtenerPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const cita = await CitaModel.obtenerPorId(id);

      if (!cita) {
        return res.status(404).json({ error: { message: 'Cita no encontrada' } });
      }

      res.json(cita);
    } catch (error) {
      res.status(500).json({ error: { message: 'Error al obtener la cita' } });
    }
  },

  crear: async (req, res) => {
    try {
      const cita = req.body;
      const nueva = await CitaModel.crear(cita);
      res.status(201).json(nueva);
    } catch (error) {
      res.status(400).json({ error: { message: error.message || 'Error al crear la cita' } });
    }
  },

  actualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const datos = req.body;

      const actualizado = await CitaModel.actualizar(id, datos);
      res.json(actualizado);
    } catch (error) {
      res.status(400).json({ error: { message: error.message || 'Error al actualizar la cita' } });
    }
  },

  eliminar: async (req, res) => {
    try {
      const { id } = req.params;
      await CitaModel.eliminar(id);

      res.json({ message: 'Cita eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ error: { message: 'Error al eliminar la cita' } });
    }
  }
};

module.exports = citaController;
