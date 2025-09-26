const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const catchAsync = require("../utils/catchAsync");
const userModel = require("../models/UserModel");
const dotenv = require("dotenv");
dotenv.config();

exports.attachUserId = (req, res, next) => {
  console.log("User ID attached:", req.body);
  next();
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Setting up the storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.headers["userId"] || req.headers["userid"];
    console.log("UserId : ", userId);
    const uploadDir = path.join(__dirname, `../uploads/${userId}`);

    // Create the user-specific directory if it doesn't exist
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    req.finalDestination = path.join(
      __dirname,
      `../uploads/${req.headers["userId"] || req.headers["userid"]}/${fileName}`
    );

    cb(null, fileName); // Ensure unique filenames
  },
});

// Multer setup with file size limit and allowed file types
exports.upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|png|jpg|webp/;
    const extension = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype); // Check the mime type

    if (mimeType && extension) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed."));
    }
  },
}).single("photo"); // 'photo' is the field name in the form

// Controller to handle the file after it's uploaded
exports.uploadFile = catchAsync(async (req, res, next) => {
  const userId = req.body.userId || req.headers.userid; // Fallback to headers if body is undefined

  if (!userId) {
    return res.status(400).json({ message: "UserId is missing." });
  }

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const filePath = req.finalDestination;
  console.log("File saved locally at:", filePath);

  try {
    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `uploads/${userId}`,
      public_id: path.basename(filePath, path.extname(filePath)), // File name without extension
    });

    console.log("Uploaded to Cloudinary:", result);

    // Update the user's photo URL in the database
    const user = await userModel.findByIdAndUpdate(
      userId,
      { photo: result.secure_url }, // Save Cloudinary URL
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "File uploaded successfully",
      cloudinaryUrl: result.secure_url, // Cloudinary URL
      user, // Updated user data
    });
  } catch (err) {
    console.error("Error uploading to Cloudinary:", err);
    return next(err); // Pass the error to the global error handler
  }
});
