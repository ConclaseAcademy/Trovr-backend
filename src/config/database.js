// const { Sequelize } = require("sequelize");
// // console.log(process.env.DB_DATABASE)
// // console.log(process.env.DB_PASSWORD)
// // console.log(process.env.DB_HOST)
// // console.log(process.env.DB_USER)


// const sequelize = new Sequelize(
//   process.env.DB_DATABASE,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "postgres",
//     logging: false,
//   }
// );
// sequelize.sync({ force: true }).then(() => {
//   console.log("Database & tables created!");
// });

// module.exports = sequelize;


const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

module.exports = sequelize;