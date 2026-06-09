const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  contact: {
    type: DataTypes.STRING,
    allowNull: true
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM("ADMIN", "STUDENT"),
    defaultValue: "STUDENT",
  },
failedLoginAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    lockedUntil: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    profilePhoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    resetPasswordToken: {
  type: DataTypes.STRING,
  allowNull: true,
},

resetPasswordExpiresAt: {
  type: DataTypes.DATE,
  allowNull: true,
},

    itemsSoldCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    lastSeenAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    verificationLink: {
       type: DataTypes.STRING,
       allowNull: true
    },

    verificationToken: {
  type: DataTypes.STRING,
  allowNull: true,
},

verifiedAt: {
  type: DataTypes.DATE,
  allowNull: true,
},
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  

  isSuspended: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  itemsSoldCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,

  },
});


module.exports = User;