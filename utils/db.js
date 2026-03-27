const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'capture_crm',
  password: 'guru90039',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};