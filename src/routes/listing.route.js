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
 * /listings:
 *   post:
 *     summary: Create listing
 *     tags:
 *       - Listings
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *
 *             required:
 *               - title
 *               - category
 *               - price
 *               - description
 *               - images
 *
 *             properties:
 *               title:
 *                 type: string
 *
 *               category:
 *                 type: string
 *
 *               price:
 *                 type: number
 *
 *               description:
 *                 type: string
 *
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
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
 * /listings/my:
 *   get:
 *     summary: Get my listings
 *     tags:
 *       - Listings
 *
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/my",
  authMiddleware,
  listingController.getMyListings
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




module.exports = router;