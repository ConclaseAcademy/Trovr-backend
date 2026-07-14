const jwt = require("jsonwebtoken");

module.exports = (user) => {
  console.log(process.env.JWT_EXPIRES_IN)
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },

    process.env.JWT_SECRET,

    {
      expiresIn:
        process.env.JWT_EXPIRES_IN,
    }
  );
};