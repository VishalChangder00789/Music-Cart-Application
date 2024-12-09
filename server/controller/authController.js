const catchAsync = require("../utils/catchAsync");
const userModel = require("../models/UserModel");
const cartModel = require("../models/CartModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { sendEmail } = require("./emailController");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//creating token
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.WEBSECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

// The user will be signing up and will be generating a jsonWebToken
exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = await userModel.create(req.body);
  const newUserCart = await cartModel.create({ user: newUser._id, items: [] });

  const token = signToken(newUser._id);

  const subject = "Welcome to Music cart";
  const text = `Hi ${name} , We are so excited to have you on board! Get ready to explore a world of music tailored just for you. Whether you are discovering new tracks, curating your personal playlist, or shopping for the best deals on music, Music Cart is here to bring you closer to the beats you love. Start exploring, enjoy the music, and let the journey begin! Happy listening! 🎧✨ Your password is ${password}`;

  await sendEmail(email, subject, text);

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

  // Both the passwords passed are encrypted form
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

exports.forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).json({
      status: "fail",
      message: "Email is required",
    });
  }

  try {
    // Find user in the database
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User does not exist",
      });
    }

    // create a token and expiry and attach it to the frontend when the person clicks on that link
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedResetToken = await bcrypt.hash(resetToken, 12);
    const tokenExpiresIn = Date.now() + 10 * 60 * 1000;
    // const tokenExpiredIn = Date.now() + 3000;

    user.passwordResetToken = hashedResetToken;
    user.passwordResetExpires = tokenExpiresIn;
    user.save({
      validateBeforeSave: false,
    });

    let resetUrl = `http://localhost:3000/reset-password/confirm-password/${encodeURIComponent(
      hashedResetToken
    )}`;

    // Successfull
    let subject = "Reset your password";
    let text = `Hi ${user.name},
    You requested to reset your password. Please use the link below to reset your password:
    ${resetUrl}

    The above link will be valid for 10 mins

    If you did not request this, please ignore this email.
  `;

    await sendEmail(email, subject, text);

    return res.status(200).json({
      status: "success",
      message: "Email is sent",
    });
  } catch (error) {
    // Handle any unexpected errors
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
      error: error.message,
    });
  }
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

exports.finishForgotPassword = catchAsync(async (req, res, next) => {
  const { token } = req.body;

  // Validate token presence
  if (!token) {
    return res.status(400).json({
      status: "fail",
      message: "Token is required",
    });
  }

  // Find user by reset token
  const user = await userModel.findOne({ passwordResetToken: token });

  if (
    !user ||
    !user.passwordResetExpires ||
    user.passwordResetExpires < Date.now()
  ) {
    return res.status(401).json({
      status: "fail",
      message: "Token is invalid or has expired",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Password has been reset successfully",
  });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const { newPassword, confirmPassword, token } = req.body;

  // Find user by passwordResetToken (token should be valid)
  const user = await userModel.findOne({ passwordResetToken: token });
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found.",
    });
  }

  const userId = user._id;

  // 1. Check if all fields are provided
  if (!newPassword || !confirmPassword) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide new password and confirm password.",
    });
  }

  // 2. Check if the new password matches the confirmed password
  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      status: "fail",
      message: "New password and confirm password do not match.",
    });
  }

  // 3. Fetch the previous password for comparison
  const previousPassword = await userModel.findById(userId).select("+password");

  // 4. Check if the new password is the same as the old password
  const isPasswordMatch = await bcrypt.compare(
    newPassword,
    previousPassword.password
  );
  if (isPasswordMatch) {
    return res.status(400).json({
      status: "fail",
      message: "New password cannot be the same as the old password.",
    });
  }

  // 5. Hash the new password before saving (using pre-save hook)
  user.password = newPassword; // The pre-save hook will hash it automatically
  user.passwordConfirm = undefined; // No need to store confirmPassword in DB
  user.passwordResetToken = undefined; // Optionally clear the reset token
  user.passwordResetExpires = undefined; // Clear expiration
  user.passwordChangedAt = Date.now(); // Record the time the password was changed

  // Save the updated user record
  await user.save();

  // 6. Send success response
  res.status(200).json({
    status: "success",
    message: "Password updated successfully.",
  });
});
