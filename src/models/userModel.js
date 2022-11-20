const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      minLength: 7,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
      length: 10,
    },
  },
  { collection: "users" }
);

const UserModel = mongoose.model("Users", User);

module.exports = UserModel;
