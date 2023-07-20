const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/dbConnection.js");
const userRoutes = require("./modules/User/user-routes.js");

dotenv.config();

const app = express();

db.authenticate()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

db.sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

app.use(express.json());
app.use("/api/v1", userRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
