const Users = require("./../models/UserModel");
const UserSettings = require("./../models/UserSettingsModel");

exports.getUserSettings = async (req, res, next) => {
  // get userId from request parameters

  console.log("Reaching");
  console.log(req.params);

  const { userId } = req.params;
  console.log("========>", userId);

  try {
    // Find user settings by userId
    const userSettings = await UserSettings.findOne({ userId });

    // Check if user settings are found
    if (!userSettings) {
      return res.status(404).json({
        status: "failed",
        message: "User settings not found",
      });
    }

    // Return the user settings if found
    return res.status(200).json({
      status: "success",
      message: "Found user settings",
      userSettings,
    });
  } catch (err) {
    // Log the error for debugging
    console.error(err);

    // Send a server error response
    return res.status(500).json({
      status: "error",
      message: "Server error, please try again later",
    });
  }
};

exports.updateUserSettings = async (req, res, next) => {
  const { userId, settingsId } = req.params; // Corrected from `req.patams` to `req.params`
  const { nightMode, twoFactor, subscription } = req.body; // Corrected the typo 'subsciption' to 'subscription'

  // Verify user with userId
  const isUserId = await Users.findOne({ _id: userId });

  if (!isUserId) {
    return res.status(400).json({
      status: "fail",
      message: "User not found",
    });
  }

  // Verify settingsId
  const isSettingsId = await UserSettings.findOne({ _id: settingsId });

  if (!isSettingsId) {
    return res.status(400).json({
      status: "fail",
      message: "User Settings not binded",
    });
  }

  // Now update the settings (you can update the specific fields)
  const updatedSettings = await UserSettings.findByIdAndUpdate(
    settingsId,
    { nightMode, twoFactor, subscription },
    { new: true, runValidators: true }
  );

  // If the update was successful, return the updated settings
  if (!updatedSettings) {
    return res.status(500).json({
      status: "fail",
      message: "Failed to update user settings",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "User settings updated successfully",
    updatedSettings,
  });
};
