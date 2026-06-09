const {
  body,
} = require("express-validator");

exports.registerValidator = [
  body("fullName")
    .notEmpty()
    .withMessage(
      "Full name is required"
    ),

  body("email")
    .isEmail()
    .withMessage(
      "Valid email required"
    ),

  body("password")
    .isLength({ min: 8 })
    .withMessage(
      "Password must be at least 8 characters"
    
    ),
    body("contact")
    .isLength({min: 11 })
    .withMessage(
        "Phone number must be 11 characters"
    ),

];
exports.loginValidator = [
  body("email")
    .isEmail(),

  body("password")
    .notEmpty(),
];
