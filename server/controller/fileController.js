const multer = require("multer");
const path = require("path");
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const userModel = require("../models/UserModel");

exports.attachUserId = (req, res, next) => {
  console.log("User ID attached:", req.body);
  next();
};

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
    req.finalDestination = `uploads/${
      req.headers["userId"] || req.headers["userid"]
    }/${fileName}`;

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
      cb("Error: Only images are allowed");
    }
  },
}).single("photo"); // 'photo' is the field name in the form

// Controller to handle the file after it's uploaded
exports.uploadFile = catchAsync(async (req, res, next) => {
  const userId = req.body.userId || req.headers.userid; // Fallback to headers if body is undefined
  console.log("UserId we get is:", userId);

  if (!userId) {
    return res.status(400).json({ message: "UserId is missing." });
  }

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const filePath = req.finalDestination;
  console.log(req.finalDestination);

  try {
    // Update the user's photo path in the database
    const user = await userModel.findByIdAndUpdate(
      userId,
      { photo: filePath },
      { new: true, runValidators: true } // Ensures validation and returns the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "File uploaded successfully",
      file: req.file, // Return file details like path, name, etc.
      user, // Optionally include updated user data
    });
  } catch (err) {
    return next(err); // Pass the error to the global error handler
  }
});
