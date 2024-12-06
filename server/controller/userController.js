const catchAsync = require("../utils/catchAsync");
const Users = require("./../models/UserModel");

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
