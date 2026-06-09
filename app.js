require("dotenv").config();
const express = require('express')
const app = express()
app.use(express.json())
const sequelize = require("./src/config/database");
const seedAdmin = require("./src/seeders/admin-user");

async function start() {
  try {
    await sequelize.authenticate();

    console.log("DB connected");

    await sequelize.sync({ force: false });

    console.log("Tables created");

    await seedAdmin();

    console.log("Admin seeded");

    // app.listen(PORT, () => {
    //   console.log(`Server running on ${PORT}`);
    // });
  } catch (error) {
    console.error(error);
  }
}

start();
const authRoutes = require("./src/routes/auth.route.js");
const schoolRoutes = require("./src/routes/school.route.js")
app.use(
  "/api/auth",
  authRoutes
);
app.use(
    "/api/school",
    schoolRoutes
)
const PORT = 5000
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})




  