const catchAsync = require("../utils/catchAsync");
const Users = require("./../models/UserModel");

exports.deleteAccount = catchAsync(async (req, res, next) => {
  const { userSetting, userId } = req.body;

  // Check if required data is passed
  if (!userSetting || !userId) {
    return res.status(400).json({
      status: "fail",
      message: "Pass the data properly",
    });
  }

  // Find the user asynchronously
  const user = await Users.findOne({ _id: userId });

  // Check if the user exists
  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "User not found",
    });
  }

  // If user is found, update the deleteAccount flag
  user.deleteAccount = userSetting;

  // Save the updated user asynchronously
  await user.save();

  return res.status(200).json({
    status: "success",
    message: "Account scheduled for deletion",
    user,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await Users.find();
  console.log("Ran1");

  return res.status(201).json({
    status: "success",
    message: "Users Found",
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  console.log("Ran2");

  const user = await Users.findOne({ _id: userId }); // Use findOne for a single user

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "User found",
    data: user, // Return the user object directly
  });
});
