const jwt = require("jsonwebtoken");

const ApiError =
  require("../utils/ApiError");

module.exports = (
  req,
  res,
  next
) => {
  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return next(
      new ApiError(
        401,
        "Unauthorized"
      )
    );
  }
// console.log(authHeader)
  const token =
    authHeader.replace(
      "Bearer ",
      ""
    );
// console.log(token)
  try {
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    req.user = decoded;
console.log("token decoded")
    next();
  } catch (error) {
    next(
      new ApiError(
        401,
        "Invalid token"
      )
    );
  }
};