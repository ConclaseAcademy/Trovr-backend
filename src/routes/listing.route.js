const express = require("express");

const router = express.Router();

const listingController = require("../controllers/listing.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const listingOwner =
  require("../middlewares/listingOwner.middleware");

const imageProcessor = require("../middlewares/imageProcessor.middleware")

const upload =
  require("../middlewares/upload.middleware");

const {
  createListingValidator,
  updateListingValidator,
  filterListingsValidator,
} = require("../validators/listing.validator");

const validate =
  require("../middlewares/validation.middleware");

  /**
 * @swagger
 * /listings:
 *   get:
 *     summary: Browse listings
 *     tags:
 *       - Listings
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *
 *     responses:
 *       200:
 *         description: Listings retrieved successfully
 */
router.get(
  "/",
  filterListingsValidator,
  validate,
  listingController.browseListings
);

/**
 * @swagger
 * /listings:
 *   get:
 *     summary: Browse listings
 *     tags:
 *       - Listings
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *
 *     responses:
 *       200:
 *         description: Listings retrieved successfully
 */
router.get(
  "/",
  filterListingsValidator,
  validate,
  listingController.browseListings
);


/**
 * @swagger
 * /listings:
 *   post:
 *     summary: Create a new listing
 *     description: Creates a marketplace listing for the authenticated user.
 *     tags:
 *       - Listings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *               - price
 *               - description
 *               - images
 *             properties:
 *               title:
 *                 type: string
 *                 example: HP EliteBook 840
 *               category:
 *                 type: string
 *                 enum:
 *                   - BOOKS
 *                   - ELECTRONICS
 *                   - FURNITURE
 *                   - CLOTHING
 *                   - OTHER
 *               price:
 *                 type: number
 *                 example: 120000
 *               description:
 *                 type: string
 *                 example: Very clean laptop with charger.
 *               locationName:
 *                 type: string
 *                 example: University of Lagos Main Gate

 *               latitude:
 *                 type: number
 *                 example: 6.5158

 *               longitude:
 *                 type: number
 *                 example: 3.3896
 *               images:
 *                 type: array
 *                 minItems: 1
 *                 maxItems: 5
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Listing created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Listing created successfully
 *                 data:
 *                   type: object
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Authentication required.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  authMiddleware,

//   upload.array("images", 5),
// (req, res, next) => {
//     console.log("uploading images")
//     upload.array("images", 5)(req, res, function (err) {
//       if (err) {
//         console.log("MULTER ERROR:", err);
//         return res.status(400).json({
//           message: err.message
//         });
//       }
// console.log("still uploading")
//       next();
//     });
//   },

  upload.array(
        "images",
        5
    ),

    imageProcessor,

  createListingValidator,

  validate,

  listingController.createListing
);


/**
 * @swagger
 * /listings/my:
 *   get:
 *     summary: Get my listings
 *     description: Returns all listings created by the authenticated user.
 *     tags:
 *       - Listings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved listings
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/my",
  authMiddleware,
  listingController.getMyListings
);


/**
 * @swagger
 * /listings/{listingId}/sold:
 *   patch:
 *     summary: Mark listing as sold
 *     tags:
 *       - Listings
 */
router.patch(
  "/:listingId/sold",

  authMiddleware,

  listingOwner,

  listingController.markAsSold
);

/**
 * @swagger
 * /listings/{listingId}/relist:
 *   patch:
 *     summary: Relist a sold item
 *     tags:
 *       - Listings
 */
router.patch(
  "/:listingId/relist",

  authMiddleware,

  listingOwner,

  listingController.relistListing
);

/**
 * @swagger
 * /listings/{listingId}:
 *   get:
 *     summary: Get listing details
 *     tags:
 *       - Listings
 *
 *     parameters:
 *       - in: path
 *         name: listingId
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Listing retrieved successfully
 */
router.get(
  "/:listingId",
  listingController.getListingById
);

/**
 * @swagger
 * /listings/{listingId}:
 *   patch:
 *     summary: Update listing
 *     tags:
 *       - Listings
 *
 *     security:
 *       - bearerAuth: []
 */
router.patch(
  "/:listingId",

  authMiddleware,

  listingOwner,

  updateListingValidator,

  validate,

  listingController.updateListing
);

/**
 * @swagger
 * /listings/{listingId}/images:
 *   patch:
 *     summary: Replace listing images
 *     tags:
 *       - Listings
 */
router.patch(
  "/:listingId/images",

  authMiddleware,

  listingOwner,

  upload.array("images", 5),

  listingController.replaceImages
);

/**
 * @swagger
 * /listings/{listingId}/images/{imageId}:
 *   delete:
 *     summary: Delete image
 *     tags:
 *       - Listings
 */
router.delete(
  "/:listingId/images/:imageId",

  authMiddleware,

  listingOwner,

  listingController.deleteImage
);

/**
 * @swagger
 * /listings/{id}:
 *   delete:
 *     summary: Delete a listing
 *     description: Deletes one of the authenticated user's listings along with its images and related conversations.
 *     tags:
 *       - Listings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Listing deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: You do not own this listing.
 *       404:
 *         description: Listing not found.
 */
router.delete(
    "/:id",
    authMiddleware,
    listingController.deleteListing
);

module.exports = router;