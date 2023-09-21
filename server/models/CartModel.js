const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const cartSchema = mongoose.Schema({
  products: {
    type: [Object],
  },
});

const Cart = mongoose.model("CartItem", cartSchema);
module.exports = Cart;
