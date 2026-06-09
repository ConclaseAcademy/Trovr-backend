const { DataTypes } = require("sequelize");

const sequelize =
  require("../config/database");

const RefreshToken =
  sequelize.define(
    "RefreshToken",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue:
          DataTypes.UUIDV4,
        primaryKey: true,
      },

      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }
  );

module.exports = RefreshToken;
