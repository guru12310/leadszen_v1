const nodemailer = require("nodemailer");

// async function test() {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.titan.email",
//     port: 465,
//     secure: true,
//     auth: {
//       user: "support@leadszen.in",
//       pass: "Guru@90039"
//     }
//   });

//   await transporter.verify();
//   console.log("SMTP connection works");
// }


async function test() {
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

  await transporter.verify();
  console.log("SMTP works");
}
test().catch(console.error);