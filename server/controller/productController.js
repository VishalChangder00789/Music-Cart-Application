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
  const queryObj = {};

  if (req.query.color) {
    queryObj.color = req.query.color;
  }

  if (req.query.brand) {
    queryObj.brand = req.query.brand;
  }

  if (req.query.productType) {
    queryObj.productType = req.query.productType;
  }

  if (req.query.price) {
    queryObj.price = req.query.price;
  }

  if (req.query.search) {
    queryObj.productName = { $regex: new RegExp(req.query.search, "i") };
  }

  console.log(req.query);
  console.log(queryObj);

  const products = await Product.find(queryObj);

  return res.status(201).json({
    status: "Success",
    message: "Products are fetched",
    length: products.length,
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
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(201).json({
    status: "Success",
    message: "Product is updated",
    updatedProduct,
  });
});
