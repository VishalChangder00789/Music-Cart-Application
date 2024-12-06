const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  street: {
    type: String,
    required: [true, "Street is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  postalCode: {
    type: String,
    required: [true, "Postal code is required"],
  },
  isPrimary: {
    type: Boolean,
    default: false,
  },
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
