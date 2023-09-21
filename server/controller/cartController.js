const catchAsync = require("../utils/catchAsync");
const Cart = require("../models/CartModel");

exports.createCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.create(req.body);

  return res.status(201).json({
    status: "success",
    message: "cart is created for user",
    cart,
  });
});

exports.getCartItemById = catchAsync(async (req, res, next) => {
  const cartItem = await Cart.findById(req.params.id);

  res.status(201).json({
    status: "Success",
    cartItem,
  });
});

exports.updateCartItem = catchAsync(async (req, res, next) => {
  const updatedCartItem = await Cart.findByIdAndUpdate(
    req.params.id,
    { $push: { products: req.body } },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({
    status: "Success",
    data: {
      updatedCartItem,
    },
  });
});
