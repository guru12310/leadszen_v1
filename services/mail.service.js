// services/mail.service.js

const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT),
//     secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//     },
// });

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.titan.email",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "support@leadszen.in",
//     pass: "your-email-password"
//   }
// });

  const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
      user: "support@leadszen.in",
      pass: "Guru@90039"
    },
    logger: true,
    debug: true
  });

// async function sendMail({ to, subject, html }) {
//     try {

//       transporter.verify(function (err, success) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("SMTP Connected");
//         }
//       });
//         const info = await transporter.sendMail({
//             from: `"LeadsZen Support" <${process.env.SMTP_USER}>`,
//             to,
//             subject,
//             html,
//         });

//         console.log("Email Sent:", info.messageId);

//         return {
//             success: true,
//             messageId: info.messageId,
//         };
//     } catch (err) {
//         console.error("Mail Error:", err);

//         return {
//             success: false,
//             error: err.message,
//         };
//     }
// }

async function sendMail({ to, subject, html }) {
    try {

        const info = await transporter.sendMail({
            from: `"LeadsZen Support" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        });

        console.log("✅ Email Sent Successfully");
        console.log("Message ID:", info.messageId);

        return {
            success: true,
            messageId: info.messageId,
        };

    } catch (err) {

        console.error("❌ Failed to send email");
        console.error("Code:", err.code);
        console.error("Command:", err.command);
        console.error("Message:", err.message);
        console.error(err);

        return {
            success: false,
            error: err.message,
        };

    }
}



(async () => {
    try {

        await transporter.verify();
        console.log("✅ SMTP Connected");

    } catch (err) {

        console.error("❌ SMTP Connection Failed");
        console.error(err);

    }
})();

async function sendOTPEmail(email, otp) {
    const html = `
  <!DOCTYPE html>
  <html>
  <body style="font-family:Arial;background:#f4f6f8;padding:40px;">

    <table
      width="600"
      align="center"
      style="
      background:#ffffff;
      border-radius:10px;
      padding:35px;
      box-shadow:0 5px 20px rgba(0,0,0,.08);">

      <tr>
        <td align="center">

          <h2 style="color:#0F62FE;margin-top:30px;">
            Verify Your Email
          </h2>

          <p style="font-size:16px;color:#555;">
            Welcome to <b>LeadsZen</b>.
            Please verify your email using the OTP below.
          </p>

          <div
          style="
          font-size:34px;
          font-weight:bold;
          letter-spacing:10px;
          margin:30px 0;
          color:#111;">
            ${otp}
          </div>

          <p style="color:#666;">
            This OTP is valid for
            <b>10 minutes</b>.
          </p>

          <hr style="margin:35px 0;">

          <p style="font-size:14px;color:#777;">
            If you didn't create this account,
            you can safely ignore this email.
          </p>

          <p style="margin-top:30px;">

            Regards,<br>

            <b>LeadsZen Support Team</b><br>

            Lead Management & Business Automation Software<br>

            🌐 https://leadszen.in<br>

            📧 support@leadszen.in

          </p>

        </td>
      </tr>

    </table>

  </body>
  </html>
  `;

    return sendMail({
        to: email,
        subject: "Verify your LeadsZen account",
        html,
    });
}

async function sendWelcomeEmail(email, name) {
    const html = `
  <!DOCTYPE html>
  <html>
  <body style="font-family:Arial;background:#f4f6f8;padding:40px;">

  <table
  width="600"
  align="center"
  style="
  background:white;
  border-radius:10px;
  padding:35px;">

  <tr>

  <td align="center">

  <img
  src="https://leadszen.in/assets/logo.png"
  width="170"/>

  <h2 style="color:#0F62FE;">
  Welcome to LeadsZen 🎉
  </h2>

  <p>

  Hi <b>${name}</b>,

  <br><br>

  Your account has been successfully verified.

  </p>

  <p>

  You can now log in and start managing your leads.

  </p>

  <a
  href="https://leadszen.in/login.html"
  style="
  background:#0F62FE;
  color:white;
  text-decoration:none;
  padding:14px 30px;
  border-radius:6px;
  display:inline-block;
  margin-top:25px;">
  Login Now
  </a>

  <hr style="margin:35px 0;">

  <p>

  Regards,<br>

  <b>LeadsZen Support Team</b><br>

  Lead Management & Business Automation Software<br>

  🌐 https://leadszen.in<br>

  📧 support@leadszen.in

  </p>

  </td>

  </tr>

  </table>

  </body>
  </html>
  `;

    return sendMail({
        to: email,
        subject: "Welcome to LeadsZen 🎉",
        html,
    });
}

module.exports = {
    sendMail,
    sendOTPEmail,
    sendWelcomeEmail,
};


