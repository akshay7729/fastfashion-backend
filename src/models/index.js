const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      minLength: 7,
      unique: true,
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

const User = mongoose.model("Users", UserSchema);

module.exports = User;
