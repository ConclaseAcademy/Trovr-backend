const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const LISTING_CATEGORIES = require("../constants/listingCategories");

const Listing = sequelize.define(
  "Listing",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(80),
      allowNull: false,
      validate: {
        len: [1, 80],
      },
    },

     status: {
          type: DataTypes.ENUM(
           "LIVE",
            "SOLD"
      ),

     defaultValue: "LIVE"
     },

    category: {
      type: DataTypes.ENUM(
        LISTING_CATEGORIES.EDUCATION,
        LISTING_CATEGORIES.ELECTRONICS,
        LISTING_CATEGORIES.FURNITURE,
        LISTING_CATEGORIES.FASHION,
        LISTING_CATEGORIES.SPORTS
      ),
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        len: [1, 500],
      },
    },

        locationName: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
    },

    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
    },

    soldAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    relistedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    viewsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    sellerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {

    indexes: [
      {
        fields: ["category"],
      },
      {
        fields: ["sellerId"],
      },
      {
        fields: ["createdAt"],
      },
      {
        fields: ["status"],
      },
    ],
  }
);

module.exports = Listing;