const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    conversationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    readAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    indexes: [
    {
        fields: ["conversationId"]
    },
    {
        fields: ["senderId"]
    },
    {
        fields: ["createdAt"]
    }
    ]
  }
);

module.exports = Message