const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user should have a name"],
  },

  email: {
    type: String,
    required: [true, "A user should have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "A user should have an email"],
  },

  photo: {
    type: String,
  },

  password: {
    type: String,
    required: [true, "A user should include a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This will only work on SAVE or CREATE
      validator: function (el) {
        return el === this.password;
      },
    },
  },
  cartId: {
    type: String,
  },

  address: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  ],

  passwordChangedAt: Date,
});

// Pre Hook Middlewares
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Instance method for a single document
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method for changed Password

// returns true is the user has changed the password
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    // when the password is changed
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    // if the password is changed is more than the time when the JWT was issued that means the password is changed later on and the
    // token now is invalid
    return JWTTimestamp < changedTimeStamp;
  }

  return false; // password not changed
};

const User = mongoose.model("User", userSchema);
module.exports = User;
