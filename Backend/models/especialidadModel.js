const pool = require('../database');

class EspecialidadModel {

  static async listar() {
    const [rows] = await pool.query('SELECT * FROM especialidad');
    return rows;
  }

  static async obtenerPorId(id) {
    const [rows] = await pool.query('SELECT * FROM especialidad WHERE id = ?', [id]);
    return rows[0];
  }

  static async crear(especialidad) {
    const sql = `
      INSERT INTO especialidad (nombre, descripcion, estado)
      VALUES (?, ?, ?)
    `;

    const params = [
      especialidad.nombre,
      especialidad.descripcion,
      especialidad.estado || 'activo'
    ];

    const [result] = await pool.query(sql, params);
    return { id: result.insertId, ...especialidad };
  }

  static async actualizar(id, especialidad) {
    const sql = `
      UPDATE especialidad
      SET nombre = ?, descripcion = ?, estado = ?
      WHERE id = ?
    `;

    const params = [
      especialidad.nombre,
      especialidad.descripcion,
      especialidad.estado || 'activo',
      id
    ];

    await pool.query(sql, params);
    return { id, ...especialidad };
  }

  static async eliminar(id) {
    await pool.query('DELETE FROM especialidad WHERE id = ?', [id]);
    return true;
  }

}

module.exports = EspecialidadModel;
