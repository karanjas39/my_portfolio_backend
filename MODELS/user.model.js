const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    default: "",
  },
  password: {
    type: String,
    required: true,
    default: "",
  },
  admin: {
    type: Boolean,
    default: false,
    immutable: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
