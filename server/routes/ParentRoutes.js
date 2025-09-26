const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const cartController = require("../controller/cartController");
const fileController = require("../controller/fileController");
const productController = require("../controller/productController");
const userSettingsController = require("../controller/userSettingsController");
const serverCheckController = require("../controller/serverCheckController");

router.route("/server-health-check").get(serverCheckController.getServerStatus);

// USERS
router.route("/_REGISTER").post(authController.register);
router.route("/_LOGIN").post(authController.login);
router.route("/_USERS").get(userController.getAllUsers);
router.route("/_USERS/:userId").get(userController.getUser);

// Upload Profile
router
  .route("/_USER/:userId/delete-account")
  .post(userController.deleteAccount);
router.route("/forget-password").post(authController.forgetPassword);
router.route("/resetpassword").post(authController.finishForgotPassword);
router.route("/changepassword").post(authController.changePassword);
router
  .route("/profile/upload")
  .post(
    fileController.attachUserId,
    fileController.upload,
    fileController.uploadFile
  );

// CART
// Add Items to the cart and increase the quantity of the item
router
  .route("/_USERS/:userId/_ADDPRODUCT/:productId")
  .post(cartController.addItemToCart);

// Remove items from the cart
router
  .route("/_USERS/:userId/_ADDPRODUCT/:productId")
  .delete(cartController.removeItemFromCart);

router.route("/_CARTS").get(cartController.getCarts);

router.route("/_CARTS/:cartId").get(cartController.getUserItemsFromCart);
// Remove the item when the item quantity is 0

// PRODUCTS
router
  .route("/_PRODUCTS")
  .get(productController.getAllProducts)
  .post(productController.createProuct);

router
  .route("/_PRODUCTS/:id")
  .get(authController.protect, productController.getProductById)
  .delete(authController.protect, productController.deleteProduct)
  .patch(authController.protect, productController.updateProduct);

router.route("/price_lowest").get(productController.getLowestPriceProduct);

router.route("/sortAscending").get(productController.getAscending);

// User Settings
router
  .route("/get-user-settings/:userId")
  .get(userSettingsController.getUserSettings);

router
  .route("/update-user-settings/:userId/:settingsId")
  .patch(userSettingsController.updateUserSettings);

module.exports = router;
