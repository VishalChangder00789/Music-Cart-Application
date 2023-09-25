const catchAsync = require("../utils/catchAsync");
const Cart = require("../models/CartModel");

exports.getCarts = catchAsync(async (req, res, next) => {
  const carts = await Cart.find();

  return res.status(201).json({
    status: "Success",
    length: carts.length,
    carts,
  });
});

exports.addItemToCart = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  const quantity = req.body.quantity || 1; // Default to 1 if quantity not specified

  const cart = await Cart.findOne({ user: userId });

  const existingItem = cart.items.find((item) =>
    item.product.equals(productId)
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity: quantity });
  }

  await cart.save();

  return res.status(201).json({
    status: "Success",
    cart,
  });
});

exports.getUserItemsFromCart = catchAsync(async (req, res, next) => {
  const cartId = req.params.cartId;

  const UserCart = await Cart.findById(cartId);

  return res.status(201).json({
    status: "Success",
    UserCart,
  });
});

exports.removeItemFromCart = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  // Getting the cart of User
  const cart = await Cart.findOne({ user: userId });

  const itemIndex = cart.items.findIndex((item) =>
    item.product.equals(productId)
  );

  if (itemIndex !== -1) {
    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();

    return res.status(201).json({
      status: "Item is removed",
      cart,
    });
  }
});
