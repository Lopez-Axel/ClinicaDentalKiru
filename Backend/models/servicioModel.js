const pool = require('../database');

class ServicioModel {

  static async listar() {
    const [rows] = await pool.query('SELECT * FROM servicios');
    return rows;
  }

  static async obtenerPorId(id) {
    const [rows] = await pool.query('SELECT * FROM servicios WHERE id = ?', [id]);
    return rows[0];
  }

  static async crear(servicio) {
    const sql = `
      INSERT INTO servicios 
        (titulo, descripcion, imagen, categoria, estado)
      VALUES (?, ?, ?, ?, ?)
    `;

    const params = [
      servicio.titulo,
      servicio.descripcion,
      servicio.imagen,
      servicio.categoria,
      servicio.estado
    ];

    const [result] = await pool.query(sql, params);
    return { id: result.insertId, ...servicio };
  }

  static async actualizar(id, servicio) {
    const sql = `
      UPDATE servicios
      SET titulo = ?, descripcion = ?, imagen = ?, categoria = ?, estado = ?
      WHERE id = ?
    `;

    const params = [
      servicio.titulo,
      servicio.descripcion,
      servicio.imagen,
      servicio.categoria,
      servicio.estado,
      id
    ];

    await pool.query(sql, params);
    return { id, ...servicio };
  }

  static async eliminar(id) {
    await pool.query('DELETE FROM servicios WHERE id = ?', [id]);
    return true;
  }
}

module.exports = ServicioModel;
