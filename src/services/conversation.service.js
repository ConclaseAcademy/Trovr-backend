const Listing = require("../models/Listing");
const Conversation = require("../models/Conversation")
const Message = require("../models/Message")
exports.startConversation =
async (
  buyerId,
  listingId,
  openingMessage
) => {

  const listing =
    await Listing.findByPk(
      listingId
    );

  if (!listing) {
    throw new ApiError(
      404,
      "Listing not found"
    );
  }

  const sellerId =
    listing.sellerId;

  let conversation =
    await Conversation.findOne({
      where: {
        listingId,
        buyerId,
        sellerId,
      },
    });

  if (!conversation) {

    conversation =
      await Conversation.create({
        listingId,
        buyerId,
        sellerId,
      });

  }

  const message =
    await Message.create({
      conversationId:
        conversation.id,

      senderId:
        buyerId,

      body:
        openingMessage,
    });

  conversation.lastMessageAt =
    message.createdAt;

  conversation.lastMessagePreview =
    openingMessage.substring(
      0,
      100
    );

    exports.sendMessage =
async (
  conversationId,
  senderId,
  body
) => {

  const message =
    await Message.create({
      conversationId,
      senderId,
      body,
    });

  await Conversation.update(
    {
      lastMessageAt:
        message.createdAt,

      lastMessagePreview:
        body.substring(
          0,
          100
        ),
    },

    {
      where: {
        id:
          conversationId,
      },
    }
  );

  return message;
};
  await conversation.save();

  return conversation;
};

exports.getInbox =
async (
  userId
) => {

  return Conversation.findAll({
    where: {
      [Op.or]: [
        {
          buyerId:
            userId,
        },
        {
          sellerId:
            userId,
        },
      ],
    },

    include: [
      {
        model: Listing,
      },

      {
        model: User,
        as: "buyer",
      },
    ],

    order: [
      [
        "lastMessageAt",
        "DESC",
      ],
    ],
  });
};

exports.getMessages =
async (
  conversationId,
  page,
  limit
) => {

  return Message.findAndCountAll({
    where: {
      conversationId,
    },

    order: [
      [
        "createdAt",
        "ASC",
      ],
    ],

    limit,

    offset:
      (page - 1) *
      limit,
  });
};

exports.unreadCount =
async (
  userId
) => {

  return Message.count({
    where: {
      isRead: false,
    },

    include: [
      {
        model:
          Conversation,

        where: {
          sellerId:
            userId,
        },
      },
    ],
  });
};