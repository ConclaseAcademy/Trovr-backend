const Listing =
  require("../models/Listing");

const ApiError =
  require("../utils/ApiError");

const listingOwner =
  async (
    req,
    res,
    next
  ) => {
    const listing =
      await Listing.findByPk(
        req.params.listingId
      );

    if (!listing) {
      return next(
        new ApiError(
          404,
          "Listing not found"
        )
      );
    }

    if (
      listing.sellerId !==
      req.user.id
    ) {
      return next(
        new ApiError(
          403,
          "You are not authorized"
        )
      );
    }

    req.listing = listing;

    next();
  };

module.exports =
  listingOwner;