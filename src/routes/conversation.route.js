const conversationController=require("../controllers/conversation.controller")
const authMiddleware=require("../middlewares/auth.middleware")
const router =
  require("express").Router();

/**
 * @swagger
 * /conversations/start:
 *   post:
 *     summary: Start a conversation about a listing
 *     tags:
 *       - Conversations
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - listingId
 *               - message
 *             properties:
 *               listingId:
 *                 type: string
 *                 format: uuid
 *               message:
 *                 type: string
 *                 example: "Hi, is this item still available?"
 *
 *     responses:
 *       201:
 *         description: Conversation started successfully
 *
 *       404:
 *         description: Listing not found
 *
 *       401:
 *         description: Unauthorized
 */

router.post(
  "/start",
  authMiddleware,
  conversationController.startConversation
);

/**
 * @swagger
 * /conversations/{id}/messages:
 *   post:
 *     summary: Send message in a conversation
 *     tags:
 *       - Conversations
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Conversation ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - body
 *             properties:
 *               body:
 *                 type: string
 *                 example: "Can you do ₦50,000?"
 *
 *     responses:
 *       201:
 *         description: Message sent successfully
 *
 *       404:
 *         description: Conversation not found
 *
 *       401:
 *         description: Unauthorized
 */

router.post(
  "/:id/messages",
  authMiddleware,
  conversationController.sendMessage
);

/**
 * @swagger
 * /conversations/inbox:
 *   get:
 *     summary: Get user's inbox
 *     tags:
 *       - Conversations
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Inbox retrieved successfully
 *
 *       401:
 *         description: Unauthorized
 */

router.get(
  "/inbox",
  authMiddleware,
  conversationController.getInbox
);

/**
 * @swagger
 * /conversations/{id}/messages:
 *   get:
 *     summary: Get messages in a conversation
 *     tags:
 *       - Conversations
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Conversation ID
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 *
 *       404:
 *         description: Conversation not found
 *
 *       401:
 *         description: Unauthorized
 */

router.get(
  "/:id/messages",
  authMiddleware,
  conversationController.getMessages
);

/**
 * @swagger
 * /conversations/unread-count:
 *   get:
 *     summary: Get unread messages count
 *     tags:
 *       - Conversations
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Unread count retrieved successfully
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 unreadCount:
 *                   type: integer
 *                   example: 5
 *
 *       401:
 *         description: Unauthorized
 */

router.get(
  "/unread-count",
  authMiddleware,
  conversationController.unreadCount
);

module.exports = router;