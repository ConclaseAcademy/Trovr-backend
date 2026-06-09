const bcrypt = require("bcryptjs");
const crypto = require("crypto");
// const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const { v4: uuidv4 } = require("uuid");

const {
  User,
  School,
  RefreshToken,
} = require("../models");

// const ApiError =
//   require("../utils/ApiError");

const generateToken =
  require("../utils/generateToken");

const generateRefreshToken =
  require("../utils/generateRefreshToken");

exports.register = async (
  payload
) => {
  const {
    fullName,
    email,
    password,
  } = payload;

  const existingUser =
    await User.findOne({
      where: { email },
    });

  if (existingUser) {
    throw new ApiError(
      400,
      "User already exists"
    );
  }

  const domain =
    email.split("@")[1];

  const school =
    await School.findOne({
      where: {
        domain,
        isActive: true,
      },
    });

  if (!school) {
    throw new ApiError(
      400,
      "Invalid school email domain"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );

    const verificationToken = uuidv4();
    const verificationLink = `${process.env.FRONTEND_BASEURL}/verify/${verificationToken}`

  const user = await User.create({
    fullName,
    email,
    password:
      hashedPassword,
    schoolId: school.id,
    verificationToken:verificationToken,
    verificationLink:verificationLink
  });


  return user;
};

exports.login = async (
  email,
  password
) => {
  const user =
    await User.findOne({
      where: { email },
    });

  if (!user) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  if (user.isSuspended) {
    throw new ApiError(
      403,
      "Account suspended"
    );
  }

  if (
    user.lockedUntil &&
    new Date() <
      user.lockedUntil
  ) {
    throw new ApiError(
      403,
      "Account temporarily locked"
    );
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    user.failedLoginAttempts += 1;

    if (
      user.failedLoginAttempts >=
      3
    ) {
      const lockTime =
        new Date();

      lockTime.setMinutes(
        lockTime.getMinutes() +
          15
      );

      user.lockedUntil =
        lockTime;
    }

    await user.save();

    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  user.failedLoginAttempts = 0;

  user.lockedUntil = null;

  user.lastSeenAt =
    new Date();

  await user.save();

  const accessToken =
    generateToken(user);

  const refreshToken =
    generateRefreshToken();

  await RefreshToken.create({
    token: refreshToken,
    expiresAt: new Date(
      Date.now() +
        7 *
          24 *
          60 *
          60 *
          1000
    ),
    userId: user.id,
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
};
// const ApiError = require("../utils/ApiError");
// const User = require("../models/User");

const verifyEmail = async (token) => {
  const user = await User.findOne({
    where: {
      verificationToken: token,
    },
  });

  if (!user) {
    throw new ApiError(
      400,
      "Invalid or expired verification link"
    );
  }

  if (user.isVerified) {
    throw new ApiError(
      400,
      "Account already verified"
    );
  }

  user.isVerified = true;
  user.verificationToken = null;
  user.verifiedAt = new Date();

  await user.save();

  return user;
};


const forgotPassword = async (email) => {
  const user = await User.findOne({
    where: { email },
  });

  /*
    Don't reveal whether user exists
  */
  if (!user) {
    return true;
  }

  const resetToken =
    crypto.randomBytes(32).toString("hex");

  const hashedToken =
    crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

  user.resetPasswordToken =
    hashedToken;

  user.resetPasswordExpiresAt =
    new Date(
      Date.now() + 60 * 60 * 1000
    ); // 1 hour

  await user.save();

  const resetUrl =
    `${process.env.FRONTEND_BASEURL}/reset-password?token=${resetToken}`;

  return {
    user,
    resetUrl,
  };
};

// const bcrypt =
//   require("bcryptjs");

// const crypto =
//   require("crypto");

const resetPassword = async (
  token,
  password
) => {

  const hashedToken =
    crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

  const user =
    await User.findOne({
      where: {
        resetPasswordToken:
          hashedToken,
      },
    });

  if (!user) {
    throw new ApiError(
      400,
      "Invalid reset token"
    );
  }

  if (
    user.resetPasswordExpiresAt <
    new Date()
  ) {
    throw new ApiError(
      400,
      "Reset token expired"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );

  user.password =
    hashedPassword;

  user.resetPasswordToken =
    null;

  user.resetPasswordExpiresAt =
    null;

  await user.save();
     console.log("user password reset successfully")
  return true;
};

// module.exports = {
//   resetPassword,
// };
// module.exports = {
//   forgotPassword,
// };

exports.verifyEmail = verifyEmail
exports.forgotPassword = forgotPassword
exports.resetPassword = resetPassword

// module.exports = {
//   verifyEmail,
// };