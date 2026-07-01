const { Op } = require("sequelize");
const sequelize = require("../config/database");

const Listing = require("../models/Listing");
const ListingImage = require("../models/ListingImage");
const User = require("../models/User");

const Conversation = require("../models/Conversation.js");
const Message = require("../models/Message.js");

const ApiError = require("../utils/ApiError");
const LISTING_STATUS = require("../constants/listingStatus");

exports.createListing = async (
  userId,
  data,
  imageUrls
) => {

  if (!imageUrls || imageUrls.length < 1) {
    throw new ApiError(
      400,
      "At least one image is required"
    );
  }
console.log("image is valid")
  // const listing = await Listing.create({
  //   title: data.title,
  //   category: data.category,
  //   price: data.price,
  //   description: data.description,
  //   sellerId: userId,
  //   status: LISTING_STATUS.LIVE,
  // });
  const listing = await Listing.create({
  title: data.title,
  category: data.category,
  price: data.price,
  description: data.description,

  locationName: data.locationName,
  latitude: data.latitude,
  longitude: data.longitude,

  sellerId: userId,
  status: LISTING_STATUS.LIVE,
});
// console.log("created listing")
//   await ListingImage.bulkCreate(
//     imageUrls.map((url, index) => ({
//       listingId: listing.id,
//       imageUrl: url,
//       displayOrder: index + 1,
//     }))
//   );
   console.log(imageUrls)
 await ListingImage.bulkCreate(
    imageUrls.map((image, index) => ({
        listingId: listing.id,

        imageUrl: image.url,

        publicId: image.publicId,

        displayOrder: index + 1
    }))
  );
//   console.log(listing)
console.log("listing successful")
  return listing;
};

exports.updateListing = async (
  listing,
  payload
) => {
  // await listing.update({
  //   title:
  //     payload.title ??
  //     listing.title,

  //   category:
  //     payload.category ??
  //     listing.category,

  //   price:
  //     payload.price ??
  //     listing.price,

  //   description:
  //     payload.description ??
  //     listing.description,
  // });
  await listing.update({

    title:
      payload.title ??
      listing.title,

    category:
      payload.category ??
      listing.category,

    price:
      payload.price ??
      listing.price,

    description:
      payload.description ??
      listing.description,

    locationName:
      payload.locationName ??
      listing.locationName,

    latitude:
      payload.latitude ??
      listing.latitude,

    longitude:
      payload.longitude ??
      listing.longitude,

});

  return listing;
};

exports.getListingById =
  async (listingId) => {
    const listing =
      await Listing.findByPk(
        listingId,
        {
          include: [
            {
              model: User,
              as: "seller",

              attributes: [
                "id",
                "fullName",
                "isVerified",
                "createdAt",
                "itemsSoldCount",
                "profilePhoto",
              ],
            },

            {
              model:
                ListingImage,
              as: "images",
            },
          ],
        }
      );

    if (!listing) {
      throw new ApiError(
        404,
        "Listing not found"
      );
    }

    return listing;
  };

exports.incrementViews =
  async (listingId) => {
    const listing =
      await Listing.findByPk(
        listingId
      );

    if (!listing) return;

    listing.viewsCount += 1;

    await listing.save();
  };

exports.getMyListings =
  async (userId) => {
    return Listing.findAll({
      where: {
        sellerId: userId,
      },

      include: [
        {
          model:
            ListingImage,
          as: "images",
        },
      ],

      order: [
        ["createdAt", "DESC"],
      ],
    });
  };

exports.browseListings =
  async ({
    page = 1,
    limit = 20,
    keyword,
    category,
    minPrice,
    maxPrice,
  }) => {
    const where = {
      status:
        LISTING_STATUS.LIVE,
    };

    if (keyword) {
      where[Op.or] = [
        {
          title: {
            [Op.iLike]:
              `%${keyword}%`,
          },
        },

        {
          description: {
            [Op.iLike]:
              `%${keyword}%`,
          },
        },
      ];
    }

    if (category) {
      where.category =
        category;
    }

    if (
      minPrice ||
      maxPrice
    ) {
      where.price = {};

      if (minPrice) {
        where.price[
          Op.gte
        ] = minPrice;
      }

      if (maxPrice) {
        where.price[
          Op.lte
        ] = maxPrice;
      }
    }

    const offset =
      (page - 1) * limit;

    const {
      rows,
      count,
    } =
      await Listing.findAndCountAll(
        {
          where,

          include: [
            {
              model:
                ListingImage,
              as: "images",
            },
          ],

          limit,

          offset,

          order: [
            [
              "createdAt",
              "DESC",
            ],
          ],
        }
      );

    return {
      listings: rows,

      total: count,

      page,

      totalPages:
        Math.ceil(
          count / limit
        ),
    };
  };

exports.markAsSold =
  async (listing) => {
    listing.status =
      LISTING_STATUS.SOLD;

    listing.soldAt =
      new Date();

    await listing.save();

    await User.increment(
      {
        itemsSoldCount: 1,
      },
      {
        where: {
          id: listing.sellerId,
        },
      }
    );

    return listing;
  };

exports.relistListing =
  async (listing) => {
    listing.status =
      LISTING_STATUS.LIVE;

    listing.relistedAt =
      new Date();

    listing.soldAt = null;

    await listing.save();

    return listing;
  };

exports.replaceImages =
  async (
    listingId,
    imageUrls
  ) => {
    await ListingImage.destroy(
      {
        where: {
          listingId,
        },
      }
    );

    await ListingImage.bulkCreate(
      imageUrls.map(
        (
          imageUrl,
          index
        ) => ({
          listingId,

          imageUrl,

          displayOrder:
            index + 1,
        })
      )
    );
  };

exports.deleteImage =
  async (
    listingId,
    imageId
  ) => {
    const image =
      await ListingImage.findOne(
        {
          where: {
            id: imageId,
            listingId,
          },
        }
      );

    if (!image) {
      throw new ApiError(
        404,
        "Image not found"
      );
    }

    await image.destroy();

    const count =
      await ListingImage.count(
        {
          where: {
            listingId,
          },
        }
      );

    if (count < 1) {
      throw new ApiError(
        400,
        "A listing must have at least one image"
      );
    }
  };

  exports.deleteListing = async (
    listingId,
    userId
) => {

    const transaction =
        await sequelize.transaction();

    try {

        const listing =
            await Listing.findByPk(
                listingId,
                {
                    include: [
                        {
                            model: ListingImage,
                            as: "images"
                        }
                    ],
                    transaction
                }
            );

        if (!listing) {
            throw new ApiError(
                404,
                "Listing not found"
            );
        }

        if (listing.sellerId !== userId) {
            throw new ApiError(
                403,
                "You can only delete your own listings."
            );
        }

        /*
        Delete physical images
        */

        // for (const image of listing.images) {

        //     await imageStorage.deleteImage(
        //         image.publicId,
        //         image.imageUrl
        //     );

        // }

        /*
        Delete image records
        */

        await ListingImage.destroy({
            where: {
                listingId
            },
            transaction
        });

        /*
        Delete conversations + messages
        */

        const conversations =
            await Conversation.findAll({
                where: {
                    listingId
                },
                transaction
            });

        for (const conversation of conversations) {

            await Message.destroy({
                where: {
                    conversationId:
                        conversation.id
                },
                transaction
            });

        }

        await Conversation.destroy({
            where: {
                listingId
            },
            transaction
        });

        /*
        Delete listing
        */

        await listing.destroy({
            transaction
        });

        await transaction.commit();

        return;

    } catch (error) {

        await transaction.rollback();

        throw error;

    }

};