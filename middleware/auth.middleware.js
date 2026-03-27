const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
        error: { code: "AUTH_ERROR", details: "Missing Authorization header" }
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, 'SECRET');

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: { code: "AUTH_ERROR", details: err.message }
    });
  }
};