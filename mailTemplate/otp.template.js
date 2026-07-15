module.exports = ({ name = "User", otp }) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
</head>

<body style="margin:0;padding:40px 0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center">

            <table width="600" cellpadding="0" cellspacing="0"
                style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,.08);">

                <!-- Header -->
                <tr>
                    <td align="center" style="background:#1677ff;padding:35px;">
                        <img
                            src="https://leadszen.in/assets/logo.png"
                            alt="LeadsZen"
                            width="180">
                    </td>
                </tr>

                <!-- Body -->
                <tr>
                    <td style="padding:45px;">

                        <h2 style="margin:0;color:#222;">
                            Verify Your Email
                        </h2>

                        <p style="font-size:16px;color:#555;line-height:28px;margin-top:30px;">
                            Hi <strong>${name}</strong>,
                        </p>

                        <p style="font-size:16px;color:#555;line-height:28px;">
                            Welcome to <strong>LeadsZen</strong>.
                            Please verify your email address using the OTP below.
                        </p>

                        <div style="margin:40px 0;text-align:center;">
                            <span
                                style="
                                    display:inline-block;
                                    padding:18px 40px;
                                    border:2px dashed #1677ff;
                                    border-radius:10px;
                                    background:#EEF5FF;
                                    color:#1677ff;
                                    font-size:34px;
                                    font-weight:bold;
                                    letter-spacing:10px;
                                ">
                                ${otp}
                            </span>
                        </div>

                        <p style="font-size:15px;color:#666;">
                            This OTP is valid for
                            <strong>10 minutes</strong>.
                        </p>

                        <p style="font-size:15px;color:#666;">
                            If you didn't request this verification,
                            please ignore this email.
                        </p>

                        <hr style="margin:35px 0;border:none;border-top:1px solid #ececec;">

                        <p style="font-size:15px;color:#555;line-height:28px;">

                            Regards,

                            <br><br>

                            <strong>LeadsZen Support Team</strong>

                            <br>

                            Lead Management & Business Automation Software

                            <br><br>

                            🌐
                            <a
                                href="https://leadszen.in"
                                style="color:#1677ff;text-decoration:none;">
                                https://leadszen.in
                            </a>

                            <br>

                            📧
                            <a
                                href="mailto:support@leadszen.in"
                                style="color:#1677ff;text-decoration:none;">
                                support@leadszen.in
                            </a>

                        </p>

                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td
                        align="center"
                        style="
                            background:#fafafa;
                            padding:18px;
                            color:#999;
                            font-size:13px;
                        ">

                        © ${new Date().getFullYear()} LeadsZen.
                        All Rights Reserved.

                    </td>
                </tr>

            </table>

        </td>
    </tr>
</table>

</body>
</html>
`;