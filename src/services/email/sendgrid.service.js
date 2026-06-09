const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  process.env.SENDGRID_API_KEY
);

const send = async ({
  to,
  subject,
  html,
}) => {
  await sgMail.send({
    to,

    from: {
      email:
        process.env.EMAIL_FROM,

      name:
        process.env.EMAIL_FROM_NAME,
    },

    subject,

    html,
  });

  return true;
};

module.exports = {
  send,
};