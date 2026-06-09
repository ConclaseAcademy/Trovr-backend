const { sendEmail } = require("./email.service");

const sendForgotPasswordEmail = async (
  email,
  resetUrl
) => {
  return sendEmail({
    to: email,

    subject: "Forgot Password",

    html: `
      <h2>Forgot Your Password?</h2>

      <p>
        We received a request to reset your password.
      </p>

      <p>
        Click the link below to create a new password:
      </p>

      <a href="${resetUrl}">
        Reset Password
      </a>

      <p>
        This link expires in 1 hour.
      </p>

      <p>
        If you did not request a password reset,
        please ignore this email.
      </p>
    `,
  });
};

module.exports = {
  sendForgotPasswordEmail,
};