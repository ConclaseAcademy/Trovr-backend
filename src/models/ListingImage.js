const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ListingImage = sequelize.define(
  "ListingImage",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    displayOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }
);

module.exports = ListingImage;