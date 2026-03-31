const db = require('../utils/db');

exports.summary = async (req, res) => {
  try {
    const clientId = req.user.id;

    const result = await db.query(
      `SELECT 
        COUNT(*) AS total_leads,
        COUNT(*) FILTER (WHERE status='NEW') AS new,
        COUNT(*) FILTER (WHERE status='IN_PROGRESS') AS in_progress,
        COUNT(*) FILTER (WHERE status='CONVERTED') AS converted,
        COUNT(*) FILTER (WHERE status='LOST') AS lost
       FROM leads
       WHERE client_id=$1`,
      [clientId]
    );

    return res.status(200).json({
      success: true,
      message: "Dashboard summary fetched",
      data: result.rows[0]
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Dashboard error",
      error: { code: "SERVER_ERROR", details: err.message }
    });
  }
};



exports.analytics = async (req, res) => {
  try {
    const clientId = req.user.id;
    const { from, to } = req.query;

    const result = await db.query(
      `SELECT 
        DATE(created_at) as date,
        COUNT(*) as total_leads,
        COUNT(*) FILTER (WHERE status='CONVERTED') as converted
       FROM leads
       WHERE client_id=$1
       AND created_at BETWEEN $2 AND $3
       GROUP BY DATE(created_at)
       ORDER BY date ASC`,
      [clientId, from, to]
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Analytics error",
      error: err.message
    });
  }
};



exports.addManualLead = async (req, res) => {
  console.log("-----req.body---",req.body)
  try {

    console.log("--------api called---------")
    const clientId = req.user.id;
    const { name, phone, location } = req.body;

    console.log("----clientId-----",clientId)
    console.log("---- req.body-----", req.body)
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone is required"
      });
    }

    await db.query(
      `INSERT INTO leads(name, phone, location, client_id, source)
       VALUES($1,$2,$3,$4,'MANUAL')`,
      [name, phone, location, clientId]
    );

    res.json({
      success: true,
      message: "Manual lead added"
    });

  } catch (err) {
    console.log("------err----",err)

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};