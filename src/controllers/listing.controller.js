const listingService = require("../services/listing.service");
const asyncHandler = require("../utils/asyncHandler");

exports.createListing = asyncHandler(
  async (req, res) => {
    const imageUrls =
      req.uploadedImages || [];

    const listing =
      await listingService.createListing(
        req.user.id,
        req.body,
        imageUrls
      );

    return res.status(201).json({
      success: true,
      message:
        "Your listing is live!",
      data: listing,
    });
  }
);

exports.updateListing = asyncHandler(
  async (req, res) => {
    const listing =
      await listingService.updateListing(
        req.listing,
        req.body
      );

    return res.status(200).json({
      success: true,
      message:
        "Listing updated successfully",
      data: listing,
    });
  }
);

exports.getListingById =
  asyncHandler(
    async (req, res) => {
      const listing =
        await listingService.getListingById(
          req.params.listingId
        );

      await listingService.incrementViews(
        listing.id
      );

      return res.status(200).json({
        success: true,
        data: listing,
      });
    }
  );

exports.getMyListings =
  asyncHandler(
    async (req, res) => {
      const listings =
        await listingService.getMyListings(
          req.user.id
        );

      return res.status(200).json({
        success: true,
        data: listings,
      });
    }
  );

exports.browseListings =
  asyncHandler(
    async (req, res) => {
      const result =
        await listingService.browseListings(
          {
            page:
              Number(
                req.query.page
              ) || 1,

            limit:
              Number(
                req.query.limit
              ) || 20,

            keyword:
              req.query.keyword,

            category:
              req.query.category,

            minPrice:
              req.query.minPrice,

            maxPrice:
              req.query.maxPrice,
          }
        );

      return res.status(200).json({
        success: true,
        data: result,
      });
    }
  );

exports.markAsSold =
  asyncHandler(
    async (req, res) => {
      const listing =
        await listingService.markAsSold(
          req.listing
        );

      return res.status(200).json({
        success: true,
        message:
          "Listing marked as sold",
        data: listing,
      });
    }
  );

exports.relistListing =
  asyncHandler(
    async (req, res) => {
      const listing =
        await listingService.relistListing(
          req.listing
        );

      return res.status(200).json({
        success: true,
        message:
          "Listing relisted successfully",
        data: listing,
      });
    }
  );

exports.replaceImages =
  asyncHandler(
    async (req, res) => {
      const imageUrls =
        req.uploadedImages || [];

      await listingService.replaceImages(
        req.listing.id,
        imageUrls
      );

      return res.status(200).json({
        success: true,
        message:
          "Listing images updated successfully",
      });
    }
  );

exports.deleteImage =
  asyncHandler(
    async (req, res) => {
      await listingService.deleteImage(
        req.params.listingId,
        req.params.imageId
      );

      return res.status(200).json({
        success: true,
        message:
          "Image removed successfully",
      });
    }
  );