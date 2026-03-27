const db = require('../utils/db');

exports.getMe = async (req, res) => {
  try {
    const clientId = req.user.id;

    const result = await db.query(
      `SELECT id, name, email, business_name, whatsapp_number, location, plan
       FROM clients
       WHERE id = $1`,
      [clientId]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
        error: {
          code: "NOT_FOUND",
          details: "Invalid client"
        }
      });
    }

    return res.status(200).json({
      success: true,
      message: "Client data fetched",
      data: result.rows[0]
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch client",
      error: {
        code: "SERVER_ERROR",
        details: err.message
      }
    });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const clientId = req.user.id;
    const { name, business_name, whatsapp_number, location } = req.body;

    // validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
        error: { code: "VALIDATION_ERROR" }
      });
    }

    await db.query(
      `UPDATE clients
       SET name=$1,
           business_name=$2,
           whatsapp_number=$3,
           location=$4,
           updated_at=NOW()
       WHERE id=$5`,
      [name, business_name, whatsapp_number, location, clientId]
    );

    return res.json({
      success: true,
      message: "Profile updated successfully"
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Update failed",
      error: { code: "SERVER_ERROR", details: err.message }
    });
  }
};