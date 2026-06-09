// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: "postgres",
// });
const User = require("./User");
const School = require("./School");
const RefreshToken =
  require("./RefreshToken");

School.hasMany(User);

User.belongsTo(School);

User.hasMany(RefreshToken);

RefreshToken.belongsTo(User);
// sequelize.sync({ force: true }).then(() => {
//   console.log("Database & tables created!");
// });
module.exports = {
  User,
  School,
  RefreshToken,
};
