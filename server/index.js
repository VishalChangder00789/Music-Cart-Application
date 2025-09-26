const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// File Imports
const ParentRoutes = require("./routes/ParentRoutes");
const AppError = require("./utils/appError");
const gloabalErrorHandler = require("./controller/errorController");
const { Console } = require("console");

// Required Middlewares
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config();

// Serve files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routing
app.use("/api/v1", ParentRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't Find ${req.originalUrl} on the server`, 404));
});

app.use(gloabalErrorHandler);

// Listening to the server
app.listen(process.env.PORT, "0.0.0.0", () => {
  mongoose
    .connect(process.env.MONGOURL)
    .then(() => {
      console.log("Database is connected");
    })
    .catch((err) => {
      console.log(err.status);
      console.log(err.message);
    });

  console.log("Server is listening to the port", process.env.PORT);
});
