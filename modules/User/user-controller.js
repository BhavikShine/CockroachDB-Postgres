const catchAsyncError = require("../../middleware/catchAsyncError");
const { generateCsvData, downloadCsvFile } = require("../../utils/downloadCsv");
const User = require("../User/user.model");

exports.userRegister = catchAsyncError(async (req, res) => {
  try {
    const userData = req.body;

    if (!userData) {
      return res.status(422).json({ error: "Please add all the fields" });
    }

    const { email } = userData;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const newUser = await User.create(userData);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

exports.getAllUsers = catchAsyncError(async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

exports.downloadCsv = catchAsyncError(async (req, res) => {
  try {
    const users = await User.findAll();

    const fields = ['id', 'name', 'email', 'phone', 'address'];

    const csvData = generateCsvData(users, fields);

    downloadCsvFile(res, csvData, 'users.csv');
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});