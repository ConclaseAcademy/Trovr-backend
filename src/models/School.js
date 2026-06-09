const { DataTypes } = require("sequelize");

const sequelize =
  require("../config/database");

const School = sequelize.define(
  "School",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue:
        DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    domain: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }
);

module.exports = School;