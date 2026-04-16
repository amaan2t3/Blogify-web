const { mongoose, model } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profile:{
      type: String,
       default: "../public/default.jpg"
    }
  },
  { timestamps: true },
);

const User = model("User", userSchema);

module.exports = User;
