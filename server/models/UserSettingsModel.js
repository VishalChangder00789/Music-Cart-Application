const mongoose = require("mongoose");

const userSettingsSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // This will reference the 'User' model
    required: true, // Ensures a userId is always provided
  },
  nightMode: {
    type: Boolean,
    default: false,
  },
  twoFactor: {
    type: Boolean,
    default: false,
  },
  subscription: {
    type: String,
    default: "Free",
  },
});

const UserSetting = mongoose.model("UserSettings", userSettingsSchema);
module.exports = UserSetting;
