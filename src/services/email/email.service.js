const sendGridService =
  require("./sendgrid.service");

const nodemailerService =
  require("./nodemailer.service");

const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    await sendGridService.send({
      to,
      subject,
      html,
    });

    console.log(
      "Email sent via SendGrid"
    );

    return {
      provider:
        "sendgrid",
    };
  } catch (
    sendGridError
  ) {
    console.error(
      "SendGrid failed:",
      sendGridError.message
    );

    await nodemailerService.send({
      to,
      subject,
      html,
    });

    console.log(
      "Email sent via Nodemailer fallback"
    );

    return {
      provider:
        "nodemailer",
    };
  }
};

module.exports = {
  sendEmail,
};