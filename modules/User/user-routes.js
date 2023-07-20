const express = require("express");
const {
  userRegister,
  getAllUsers,
  downloadCsv,
} = require("./user-controller.js");

const router = express.Router();

router.post("/register", userRegister);
router.get("/users", getAllUsers);
router.get("/downloadfile", downloadCsv);

module.exports = router;
