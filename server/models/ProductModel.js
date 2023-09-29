const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: [true, "A product should have a name"],
    unique: true,
  },
  imageURL: {
    type: [String],
    required: [true, "A product should have multiple images"],
  },
  rating: {
    type: Number,
    required: [true, "Aproduct should have a rating"],
    min: 1,
    max: 5,
  },
  color: {
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
  available: {
    type: Boolean,
    required: [true, "A product should be In-Stock"],
  },
  price: {
    type: Number,
    required: [true, "A product cannot be free of cost"],
  },
  codeName: {
    type: String,
    required: [true, "A product should have a code name"],
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
