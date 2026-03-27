const db = require('../utils/db');

exports.createLead = async (data, clientId) => {
  const result = await db.query(
    `INSERT INTO leads(name, phone, message, location, client_id)
     VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [data.name, data.phone, data.message, data.location, clientId]
  );

  return result.rows[0];
};

exports.getLeads = async (filters, clientId) => {
  const { status, from, to, location } = filters;
console.log("-------inside the fetch leads----")
  const result = await db.query(
    `SELECT * FROM leads
     WHERE client_id=$1
     AND ($2::TEXT IS NULL OR status=$2)
     AND ($3::DATE IS NULL OR created_at >= $3)
     AND ($4::DATE IS NULL OR created_at <= $4)
     AND ($5::TEXT IS NULL OR location ILIKE '%' || $5 || '%')
     ORDER BY created_at DESC`,
    [clientId, status, from, to, location]
  );

  return result.rows;
};

exports.updateStatus = async (leadId, status) => {
  await db.query(
    `UPDATE leads SET status=$1, updated_at=NOW() WHERE id=$2`,
    [status, leadId]
  );
};