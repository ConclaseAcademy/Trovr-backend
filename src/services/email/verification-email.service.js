const {
  sendEmail,
} = require("./email.service");

const sendVerificationEmail =
  async (
    email,
    verificationUrl
  ) => {
    return sendEmail({
      to: email,

      subject:
        "Verify Your Account",

      html: `
        <h2>Welcome to Campus Marketplace</h2>

        <p>
          Please verify your account.
        </p>

        <a href="${verificationUrl}">
          Verify Email
        </a>
      `,
    });
  };

module.exports = {
  sendVerificationEmail,
};