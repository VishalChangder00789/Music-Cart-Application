const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const cartItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "A cart should have a productId"],
  },

  quantity: {
    type: Number,
    default: 1,
  },
});

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A Cart should have a User Id binding"],
  },
  items: [cartItemSchema],
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
