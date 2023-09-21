const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: [true, "A product should have a name"],
  },

  rating: {
    type: Number,
    required: [true, "Aproduct should have a rating"],
    min: 1,
    max: 5,
  },
  Color: {
    type: String,
    required: [true, "A product should have a color"],
  },
  productType: {
    type: String,
    required: [true, "A product should have a product type"],
  },
  about: {
    type: String,
    required: [true, "Need a product description"],
    minlength: [50, "A description should be more than 50 characters"],
    maxlength: [1000, "A description should be less than 1000 characters"],
  },
  brand: {
    type: String,
    required: [true, "A product needs a brand"],
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
