const conversationService = require("../services/conversation.service")
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