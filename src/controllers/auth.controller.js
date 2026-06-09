const {
  validationResult,
} = require(
  "express-validator"
);

const asyncHandler =
  require("../utils/asyncHandler");

const authService =
  require("../services/auth.service");

const ApiError =
  require("../utils/ApiError");

exports.register =
  asyncHandler(
    async (req, res) => {
      const errors =
        validationResult(
          req
        );

      if (!errors.isEmpty()) {
        throw new ApiError(
          400,
          errors.array()[0]
            .msg
        );
      }

      const user =
        await authService.register(
          req.body
        );

        try {
          const {
            sendVerificationEmail,
          } = require(
            "./services/email/verification-email.service"
          );

          await sendVerificationEmail(
            user.email,
            user.verificationLink
      
          );
        } catch (error) {
          console.log (error)
        }

      return res
        .status(201)
        .json({
          success: true,
          message:
            "Account created successfully",
          data: user,
        });
    }
  );

exports.login =
  asyncHandler(
    async (req, res) => {
      const errors =
        validationResult(
          req
        );

      if (!errors.isEmpty()) {
        throw new ApiError(
          400,
          errors.array()[0]
            .msg
        );
      }

      const result =
        await authService.login(
          req.body.email,
          req.body.password
        );

      return res
        .status(200)
        .json({
          success: true,
          message:
            "Login successful",

          data: result,
        });
    }
  );

exports.verifyEmail = asyncHandler(
  async (req, res) => {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is required",
      });
    }

    await authService.verifyEmail(token);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  }
);

const {
  sendForgotPasswordEmail,
} = require(
  "../services/email/forgot-password-email.service"
);

exports.forgotPassword =
  asyncHandler(async (req, res) => {
    const result =
      await authService.forgotPassword(
        req.body.email
      );

    if (result?.user) {
      try {
        await sendForgotPasswordEmail(
        result.user.email,
        result.resetUrl
      );
      } catch (error) {
        console.log(error)
      }
      
    }

    return res.status(200).json({
      // This return url should be removed when email services are functioning.
      resetUrl:result.resetUrl,
      success: true,
      message:
        "If an account exists with that email, a password reset link has been sent.",
    });
  });

  exports.resetPassword =
  asyncHandler(
    async (req, res) => {

      const {
        token,
        password,
      } = req.body;

      await authService.resetPassword(
        token,
        password
      );

      return res.status(200).json({
        success: true,

        message:
          "Password reset successfully",
      });
    }
  );