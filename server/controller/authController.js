const catchAsync = require("../utils/catchAsync");
const userModel = require("../models/UserModel");
const cartModel = require("../models/CartModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

//creating token
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.WEBSECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

// The user will be signing up and will be generating a jsonWebToken
exports.register = catchAsync(async (req, res, next) => {
  const newUser = await userModel.create(req.body);
  const newUserCart = await cartModel.create({ user: newUser._id, items: [] });

  const token = signToken(newUser._id);

  return res.status(201).json({
    status: "User is Registered",
    token,
    userId: newUser._id,
    cartId: newUserCart._id,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Email or Password is not entered",
    });
  }

  // If user exists or not
  // explicitly select the field which is not selected in the model
  const user = await userModel.findOne({ email: email }).select("+password");

  // instance method is applied over the queried document

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(400).json({
      status: "fail",
      message: "Email or Password is incorrect",
    });
  }

  // sign the token
  const token = signToken(user._id);
  const cartId = await cartModel.findOne({ user: user._id });

  return res.status(201).json({
    status: "success",
    token,
    data: {
      userName: user.name,
      userId: user._id,
      cartId: cartId._id,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //1. if token exist

  // Send the header will https request.
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // console.log("Token is : ", token);

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Not logged in",
      error: "Token not found",
    });
  }
  //2. Validate the token or verification : Signature having id and exp
  const decoded = await promisify(jwt.verify)(token, process.env.WEBSECRET);

  //3. check if user still exists
  const freshUser = await userModel.findById(decoded.id);
  if (!freshUser) {
    return res.status(401).json({
      status: "fail",
      message: "User belongs to the user does not exist",
      error: "User does not exist",
    });
  }

  //4. check if user changed password after the JWT is issued or not
  // instance method :  if the user has changed the password
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return res.status(401).json({
      status: "fail",
      message: "User has changed the password",
      error: "Password has been changed recently, please log in again",
    });
  }

  // GRANTED ACCESS
  req.user = freshUser;
  next();
});
