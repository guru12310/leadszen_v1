const db = require('../utils/db');

exports.getClientById = async (id) => {
  const result = await db.query(
    `SELECT * FROM clients WHERE id=$1`,
    [id]
  );
  return result.rows[0];
};