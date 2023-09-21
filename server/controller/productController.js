const catchAsync = require("./../utils/catchAsync");
const Product = require("../models/ProductModel");

exports.createProuct = catchAsync(async (req, res, next) => {
  const createProduct = await Product.create(req.body);

  return res.status(201).json({
    status: "Success",
    message: "Product is created",
    createProduct,
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  return res.status(201).json({
    status: "Success",
    message: "Products are fetched",
    products,
  });
});

exports.getProductById = catchAsync(async (req, res, next) => {
  const fetchedProduct = await Product.findById(req.params.id);

  return res.status(201).json({
    status: "Success",
    message: "Product found with provided Id",
    fetchedProduct,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.id);

  return res.status(204).json({
    status: "Success",
    message: "Product is deleted",
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const updatedProduct = await findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(201).json({
    status: "Success",
    message: "Product is updated",
    updatedProduct,
  });
});
