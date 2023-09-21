const catchAsync = require("../utils/catchAsync");
const Users = require("./../models/UserModel");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await Users.find();

  return res.status(201).json({
    status: "success",
    message: "Users Found",
    data: {
      users,
    },
  });
});
