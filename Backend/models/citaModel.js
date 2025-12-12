const pool = require('../database');

class CitaModel {

  // Listar todas las citas
  static async listar() {
    const [rows] = await pool.query('SELECT * FROM citas');
    return rows;
  }

  // Obtener cita por ID
  static async obtenerPorId(id) {
    const [rows] = await pool.query('SELECT * FROM citas WHERE id = ?', [id]);
    return rows[0];
  }

  // Crear nueva cita
  static async crear(cita) {
    const sql = `
      INSERT INTO citas 
        (pacienteId, dentistaId, asunto, fecha, hora)
      VALUES (?, ?, ?, ?, ?)
    `;

    const params = [
      cita.pacienteId,
      cita.dentistaId,
      cita.asunto,
      cita.fecha,
      cita.hora
    ];

    const [result] = await pool.query(sql, params);
    return { id: result.insertId, ...cita };
  }

  // Actualizar una cita
  static async actualizar(id, cita) {
    const sql = `
      UPDATE citas
      SET pacienteId = ?, dentistaId = ?, asunto = ?, fecha = ?, hora = ?
      WHERE id = ?
    `;

    const params = [
      cita.pacienteId,
      cita.dentistaId,
      cita.asunto,
      cita.fecha,
      cita.hora,
      id
    ];

    await pool.query(sql, params);
    return { id, ...cita };
  }

  // Eliminar cita
  static async eliminar(id) {
    await pool.query('DELETE FROM citas WHERE id = ?', [id]);
    return true;
  }
}

module.exports = CitaModel;
