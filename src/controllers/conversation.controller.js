const conversationService = require("../services/conversation.service")
const asyncHandler =
  require("../utils/asyncHandler");

exports.startConversation =
asyncHandler(
  async (req, res) => {

    const conversation =
      await conversationService
      .startConversation(
        req.user.id,
        req.body.listingId,
        req.body.message
      );

    res.status(201).json({
      success: true,
      data:
        conversation,
    });
  }
);

exports.sendMessage =
asyncHandler(
  async (req, res) => {

    const message =
      await conversationService
      .sendMessage(
        req.params.id,
        req.user.id,
        req.body.body
      );

    res.status(201).json({
      success: true,
      data:
        message,
    });
  }
);

exports.getInbox = asyncHandler(
  async (req, res) => {
    const conversations =
      await conversationService.getInbox(
        req.user.id
      );

    res.status(200).json({
      success: true,
      data: conversations,
    });
  }
);

exports.getMessages = asyncHandler(
  async (req, res) => {

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;

    const messages =
      await conversationService.getMessages(
        req.params.id,
        page,
        limit
      );

    res.status(200).json({
      success: true,
      data: messages.rows,
      pagination: {
        total: messages.count,
        page,
        limit,
        totalPages: Math.ceil(
          messages.count / limit
        ),
      },
    });
  }
);

exports.unreadCount = asyncHandler(
  async (req, res) => {

    const unreadCount =
      await conversationService.unreadCount(
        req.user.id
      );

    res.status(200).json({
      success: true,
      data: {
        unreadCount,
      },
    });
  }
);