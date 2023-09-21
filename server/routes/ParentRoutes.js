const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const cartController = require("../controller/cartController");
const productController = require("../controller/productController");

router.route("/_REGISTER").post(authController.register);
router.route("/_LOGIN").post(authController.login);
router.route("/_USERS").get(userController.getAllUsers);

router.route("/_USERCREATECART").post(cartController.createCart);
router
  .route("/_USERCREATECART/:id")
  .patch(authController.protect, cartController.updateCartItem)
  .get(authController.protect, cartController.getCartItemById);

router
  .route("/_PRODUCTS")
  .get(productController.getAllProducts)
  .post(productController.createProuct);

router
  .route("/_PRODUCTS/:id")
  .get(authController.protect, productController.getProductById)
  .delete(authController.protect, productController.deleteProduct)
  .patch(authController.protect, productController.updateProduct);

module.exports = router;
