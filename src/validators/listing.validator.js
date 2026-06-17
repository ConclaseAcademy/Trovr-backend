const { body, query } = require("express-validator");
const LISTING_CATEGORIES = require("../constants/listingCategories");

const createListingValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 80 })
    .withMessage(
      "Title cannot exceed 80 characters"
    ),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(
      Object.values(
        LISTING_CATEGORIES
      )
    )
    .withMessage(
      "Invalid category"
    ),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({
      min: 0,
    })
    .withMessage(
      "Price must be greater than 0"
    ),

  body("description")
    .notEmpty()
    .withMessage(
      "Description is required"
    )
    .isLength({
      max: 500,
    })
    .withMessage(
      "Description cannot exceed 500 characters"
    ),
];

const updateListingValidator = [
  body("title")
    .optional()
    .isLength({ max: 80 }),

  body("category")
    .optional()
    .isIn(
      Object.values(
        LISTING_CATEGORIES
      )
    ),

  body("price")
    .optional()
    .isFloat({
      min: 0,
    }),

  body("description")
    .optional()
    .isLength({
      max: 500,
    }),
];

const searchListingsValidator = [
  query("keyword")
    .optional()
    .isString(),
];

const filterListingsValidator = [
  query("category")
    .optional()
    .isIn(
      Object.values(
        LISTING_CATEGORIES
      )
    ),

  query("minPrice")
    .optional()
    .isFloat({
      min: 0,
    }),

  query("maxPrice")
    .optional()
    .isFloat({
      min: 0,
    }),

  query("page")
    .optional()
    .isInt({
      min: 1,
    }),

  query("limit")
    .optional()
    .isInt({
      min: 1,
      max: 100,
    }),
];

module.exports = {
  createListingValidator,
  updateListingValidator,
  searchListingsValidator,
  filterListingsValidator,
};