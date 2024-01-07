const mongoose = require("mongoose");

const educationSchema = mongoose.Schema({
  from: {
    type: Number,
    default: 0,
    required: true,
  },
  to: {
    type: Number,
    default: 0,
    required: true,
  },
  institute: {
    type: String,
    default: "",
    required: true,
  },
  current: {
    type: Boolean,
    default: true,
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

const education = mongoose.model("education", educationSchema);

module.exports = education;
