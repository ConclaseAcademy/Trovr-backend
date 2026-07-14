const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Conversation = sequelize.define(
  "Conversation",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    buyerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    sellerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    lastMessageAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    lastMessagePreview: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    indexes: [
    {
        fields: ["buyerId"]
    },
    {
        fields: ["sellerId"]
    },
    {
        fields: ["listingId"]
    },
    {
        unique: true,
        fields: [
        "listingId",
        "buyerId",
        "sellerId"
        ]
    }
    ]
  }
);

module.exports = Conversation