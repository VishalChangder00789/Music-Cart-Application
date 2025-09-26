const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// controller
const deleteUser = require("./controller/delete-account/delete-account");

const corsOptions = {
  origin: "http://localhost:3000", // Allow only requests from this origin
  methods: "GET,POST,PUT,DELETE", // Allow specific methods
  allowedHeaders: "Content-Type,Authorization", // Allow specific headers
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
dotenv.config();

app.use(process.env.VERSION, deleteUser);

app.listen(process.env.PORT, () => {
  console.log("Server is listening to the port", process.env.PORT);
});
