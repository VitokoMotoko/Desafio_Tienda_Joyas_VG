const pool = require('../db/pool'); // Importa la configuración de la base de datos

// Controlador para obtener joyas con paginación y ordenamiento
const getJoyas = async (req, res) => {
    try {
      const { limits, page, order_by } = req.query; // Obtiene los parámetros de la query string
      const offset = (page - 1) * limits; // Calcula el offset para la paginación
      const [column, direction] = order_by.split('_'); // Separa el parámetro order_by en columna y dirección
      const result = await pool.query(`SELECT * FROM inventario ORDER BY ${column} ${direction} LIMIT $1 OFFSET $2`, [limits, offset]); // Ejecuta la consulta SQL
      res.json({
        joyas: result.rows, // Devuelve las joyas obtenidas
        links: {
          self: req.originalUrl, // Enlace a la página actual
          next: `/joyas?limits=${limits}&page=${parseInt(page) + 1}&order_by=${order_by}`, // Enlace a la página siguiente
          prev: `/joyas?limits=${limits}&page=${parseInt(page) - 1}&order_by=${order_by}`, // Enlace a la página anterior
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message }); // Maneja errores y devuelve un mensaje de error
  }
};

// Controlador para obtener joyas filtradas por precio, categoría y metal
const getJoyasFiltradas = async (req, res) => {
    try {
      const { precio_max, precio_min, categoria, metal } = req.query; // Obtiene los parámetros de la query string
  
      // Validar que los parámetros sean números
      if (isNaN(precio_max) || isNaN(precio_min)) {
        return res.status(400).json({ error: 'Los parámetros precio_max y precio_min deben ser números.' });
      }
  
      const result = await pool.query(
        `SELECT * FROM inventario WHERE precio <= $1 AND precio >= $2 AND categoria = $3 AND metal = $4`,
        [precio_max, precio_min, categoria, metal] // Parámetros para la consulta SQL
      );
      res.json(result.rows); // Devuelve las joyas filtradas
    } catch (error) {
      res.status(500).json({ error: error.message }); // Maneja errores y devuelve un mensaje de error
  }
};

module.exports = {
  getJoyas,
  getJoyasFiltradas,
};