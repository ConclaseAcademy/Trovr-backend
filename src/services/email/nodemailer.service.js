const nodemailer = require("nodemailer");

const transporter =
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,

    port: process.env.SMTP_PORT,

    secure: false,

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

const send = async ({
  to,
  subject,
  html,
}) => {
  await transporter.sendMail({
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,

    to,

    subject,

    html,
  });

  return true;
};

module.exports = {
  send,
};