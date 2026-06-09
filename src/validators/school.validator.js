const {
  body,
} = require("express-validator");

exports.createSchoolValidator = [
  body("name")
    .notEmpty()
    .withMessage(
      "School name is required"
    ),

  body("domain")
    .notEmpty()
    .withMessage(
      "School domain is required"
    ),
];

exports.updateSchoolValidator = [
  body("name")
    .optional()
    .notEmpty(),

  body("domain")
    .optional()
    .notEmpty(),
];