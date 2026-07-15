const db = require('../utils/db');
const bcrypt = require('bcrypt');
const {sendOTPEmail} = require('../services/mail.service')
const jwt = require('jsonwebtoken');
const {test}=require('../services/test')

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, whatsapp_number,business_name } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         error: { code: "VALIDATION_ERROR", details: "Email and password required" }
//       });
//     }

//     const hash = await bcrypt.hash(password, 10);

//     const result = await db.query(
//       `INSERT INTO clients(name, email, password, whatsapp_number,business_name)
//        VALUES($1,$2,$3,$4,$5) RETURNING id`,
//       [name, email, hash, whatsapp_number,business_name]
//     );

//     return res.status(201).json({
//       success: true,
//       message: "Client registered successfully",
//       data: { client_id: result.rows[0].id }
//     });

//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Registration failed",
//       error: { code: "SERVER_ERROR", details: err.message }
//     });
//   }
// };


exports.register = async (req, res) => {
    try {
        const { name, email, password, whatsapp_number, business_name } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          error: { code: "VALIDATION_ERROR", details: "Email and password required" }
        });
      }

        const existingUser = await db.query(
            "SELECT id FROM clients WHERE email=$1",
            [email]
        );

        if (existingUser.rows.length) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hash = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        const result = await db.query(
            `INSERT INTO clients
            (name,email,password,whatsapp_number,business_name,email_verified,email_otp,otp_expiry)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING id`,
            [
                name,
                email,
                hash,
                whatsapp_number,
                business_name,
                false,
                otp,
                otpExpiry
            ]
        );

        await sendOTPEmail(email, otp);

        return res.status(201).json({
            success: true,
            message: "OTP sent successfully.",
            data: {
                client_id: result.rows[0].id,
                email,
                otp_required: true
            }
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Registration failed",
            error: err.message
        });
    }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("---------login api called--------",req.body)

    const user = await db.query(`SELECT * FROM clients WHERE email=$1`, [email]);

    if (!user.rows.length) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: { code: "NOT_FOUND", details: "Invalid email" }
      });
    }

    const valid = await bcrypt.compare(password, user.rows[0].password);

    if (!valid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
        error: { code: "AUTH_ERROR", details: "Wrong password" }
      });
    }

    const token = jwt.sign({ id: user.rows[0].id }, 'SECRET');

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        client: {
          id: user.rows[0].id,
          name: user.rows[0].name
        }
      }
    });

  } catch (err) {
    console.log("--err---------",err)
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: { code: "SERVER_ERROR", details: err.message }
    });
  }
};