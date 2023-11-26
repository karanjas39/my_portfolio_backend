const mongoose = require("mongoose");

const educationSchema = mongoose.Schema(
  {
    from: {
      type: Number,
      default: 0,
      required: true,
    },
    to: {
      type: Number,
      default: new Date().getFullYear(),
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
  },
  { timestamps: true }
);

const education = mongoose.model("education", educationSchema);

module.exports = education;
