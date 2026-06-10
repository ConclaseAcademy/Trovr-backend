const rateLimit = require("express-rate-limit");

const globalLimiter =
  rateLimit({
    windowMs:
      15 * 60 * 1000,

    max: 300,

    standardHeaders: true,

    legacyHeaders: false,
  });

const authLimiter =
  rateLimit({
    windowMs:
      15 * 60 * 1000,

    max: 5,

    standardHeaders: true,

    legacyHeaders: false,
  });

const forgotPasswordLimiter =
  rateLimit({
    windowMs:
      60 * 60 * 1000,

    max: 5,
  });

const verificationLimiter =
  rateLimit({
    windowMs:
      60 * 60 * 1000,

    max: 5,
  });

module.exports = {
  globalLimiter,
  authLimiter,
  forgotPasswordLimiter,
  verificationLimiter,
};