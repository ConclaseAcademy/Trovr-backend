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

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             properties:
 *               fullName:
 *                 type: string
 *
 *               email:
 *                 type: string
 *
 *               password:
 *                 type: string
 *
 *               contact:
 *                 type: string
 *
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post(
  "/register",
  registerValidator,
  authController.register
);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             properties:
 *               email:
 *                 type: string
 *
 *               password:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post(
  "/login",
  loginValidator,
  authController.login
);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     description: Sends a password reset email if the account exists.
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *
 *     responses:
 *       200:
 *         description: Password reset email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: If an account exists with that email, a password reset link has been sent.
 *
 *       400:
 *         description: Invalid request
 */
router.post(
  "/forgot-password",
  authController.forgotPassword
);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     description: Resets the user's password using a valid password reset token.
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - token
 *               - password
 *
 *             properties:
 *               token:
 *                 type: string
 *                 example: 7a3b5a4e2f9c8d7e6f5a4b3c2d1e0f9a
 *
 *               password:
 *                 type: string
 *                 format: password
 *                 example: NewPassword123!
 *
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Password reset successfully
 *
 *       400:
 *         description: Invalid or expired reset token
 *
 *       404:
 *         description: User not found
 */
router.post(
  "/reset-password",
  authController.resetPassword
);

/**
 * @swagger
 * /auth/verify-email:
 *   get:
 *     summary: Verify user email address
 *     description: Verifies a user's email address using the verification token sent via email.
 *     tags:
 *       - Authentication
 *
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Email verification token
 *
 *     responses:
 *       200:
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Email verified successfully
 *
 *       400:
 *         description: Invalid or expired verification token
 *
 *       404:
 *         description: User not found
 */
router.get(
  "/verify-email",
  authController.verifyEmail
);


module.exports = router;