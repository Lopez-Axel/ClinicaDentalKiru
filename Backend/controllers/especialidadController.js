const EspecialidadModel = require('../models/especialidadModel');

const especialidadController = {

  listar: async (req, res) => {
    try {
      const data = await EspecialidadModel.listar();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: { message: 'Error al listar las especialidades' } });
    }
  },

  obtenerPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const esp = await EspecialidadModel.obtenerPorId(id);

      if (!esp) {
        return res.status(404).json({ error: { message: 'Especialidad no encontrada' } });
      }

      res.json(esp);
    } catch (error) {
      res.status(500).json({ error: { message: 'Error al obtener la especialidad' } });
    }
  },

  crear: async (req, res) => {
    try {
      const esp = req.body;
      const nueva = await EspecialidadModel.crear(esp);
      res.status(201).json(nueva);
    } catch (error) {
      res.status(400).json({ error: { message: 'Error al crear la especialidad' } });
    }
  },

  actualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const datos = req.body;
      const actualizado = await EspecialidadModel.actualizar(id, datos);
      res.json(actualizado);
    } catch (error) {
      res.status(400).json({ error: { message: 'Error al actualizar la especialidad' } });
    }
  },

  eliminar: async (req, res) => {
    try {
      const { id } = req.params;
      await EspecialidadModel.eliminar(id);
      res.json({ message: 'Especialidad eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ error: { message: 'Error al eliminar la especialidad' } });
    }
  }

};

module.exports = especialidadController;
