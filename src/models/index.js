// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: "postgres",
// });
const User = require("./User");
const School = require("./School");
const RefreshToken =
  require("./RefreshToken");
const Listing = require("./Listing");
const ListingImage = require("./ListingImage");
const Conversation = require("./Conversation")
const Message = require("./Message")

School.hasMany(User);

User.belongsTo(School);

User.hasMany(RefreshToken);

RefreshToken.belongsTo(User);



/*
|--------------------------------------------------------------------------
| User -> Listings
|--------------------------------------------------------------------------
*/

User.hasMany(Listing, {
  foreignKey: "sellerId",
  as: "listings",
});

Listing.belongsTo(User, {
  foreignKey: "sellerId",
  as: "seller",
});

/*
|--------------------------------------------------------------------------
| Listing -> Images
|--------------------------------------------------------------------------
*/

Listing.hasMany(ListingImage, {
  foreignKey: "listingId",
  as: "images",
  onDelete: "CASCADE",
});

ListingImage.belongsTo(Listing, {
  foreignKey: "listingId",
  as: "listing",
});

Conversation.belongsTo(Listing, {
  foreignKey: "listingId",
});

Conversation.belongsTo(User, {
  as: "buyer",
  foreignKey: "buyerId",
});

Conversation.belongsTo(User, {
  as: "seller",
  foreignKey: "sellerId",
});

Conversation.hasMany(Message, {
  foreignKey: "conversationId",
});

Message.belongsTo(Conversation);
Message.belongsTo(User, {
  as: "sender",
  foreignKey: "senderId",
});


// sequelize.sync({ force: true }).then(() => {
//   console.log("Database & tables created!");
// });
module.exports = {
  User,
  School,
  RefreshToken,
  Listing,
  ListingImage,
  Conversation,
  Message

};
