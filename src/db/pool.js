const { Pool } = require('pg'); // Importa el módulo pg para conectarse a PostgreSQL

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'joyas',
  password: 'sa123',
  port: 5432,
});

module.exports = pool;