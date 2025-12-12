import { defineStore } from 'pinia';
import { citaService } from '../services/citaService';

export const useCitasStore = defineStore('citas', {
  state: () => ({
    citas: [],
    cargando: false,
    error: null,
  }),

  actions: {

    // Obtener todas las citas
    async obtenerCitas() {
      this.cargando = true;
      this.error = null;

      try {
        const res = await citaService.getAll();
        this.citas = res.data;
      } catch (err) {
        this.error = 'Error al cargar las citas';
        console.error(err);
      } finally {
        this.cargando = false;
      }
    },

    // Obtener una cita por ID
    async obtenerCitaPorId(id) {
      try {
        const res = await citaService.getById(id);
        return res.data;
      } catch (err) {
        console.error('Error al obtener cita:', err);
        return null;
      }
    },

    // Crear nueva cita
    async crearCita(datos) {
      try {
        const res = await citaService.create(datos);
        this.citas.push(res.data); // actualiza estado al instante
        return true;
      } catch (err) {
        console.error('Error al crear cita:', err);
        return false;
      }
    },

    // Actualizar cita
    async actualizarCita(id, datos) {
      try {
        const res = await citaService.update(id, datos);

        // reemplazar en el array
        const idx = this.citas.findIndex(c => c.id === id);
        if (idx !== -1) this.citas[idx] = res.data;

        return true;
      } catch (err) {
        console.error('Error al actualizar cita:', err);
        return false;
      }
    },

    // Eliminar cita
    async eliminarCita(id) {
      try {
        await citaService.delete(id);

        // eliminar del estado
        this.citas = this.citas.filter(c => c.id !== id);

        return true;
      } catch (err) {
        console.error('Error al eliminar cita:', err);
        return false;
      }
    }
  }
});
