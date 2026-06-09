const router =
  require("express").Router();

const authController =
  require("../controllers/auth.controller");

const {
  registerValidator,
  loginValidator,
} = require(
  "../validators/auth.validator"
);

router.post(
  "/register",
  registerValidator,
  authController.register
);

router.post(
  "/login",
  loginValidator,
  authController.login
);

router.post(
  "/forgot-password",
  authController.forgotPassword
);

router.post(
  "/reset-password",
  authController.resetPassword
);

router.get(
  "/verify-email",
  authController.verifyEmail
);


module.exports = router;