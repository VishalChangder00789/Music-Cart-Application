const express = require("express");
const router = express.Router();
const axios = require("axios");
const server = `https://music-cart-backend-5.onrender.com`;

// routes
router.route("/delete-account").post(async (req, res, next) => {
  const { userId, userSetting } = req.body;
  // this will decide whether the account is scheduled for deletion or not
  // if the userSetting = true, it will receive true from body that means it is marked to be deleted
  // if false is passed, then the deletion is cancelled

  if (!userId || !userSetting) {
    return res.status(500).json({
      status: "fail",
      message: "user id not passed or userSetting is not passed",
    });
  }

  // make call to the other server
  let data = {
    userId,
    userSetting,
  };

  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/_USER/${userId}/delete-account`,
      data
    );

    const user = response.data.user;

    // Create a simplified user object to avoid circular references
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      deleteAccount: user.deleteAccount,
    };

    return res.status(200).json({
      status: "success",
      message: "Account scheduled for deletion",
      user: userResponse,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: "fail",
      message: "Error occurred while deleting account",
    });
  }
});

module.exports = router;
