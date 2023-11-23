const mongoose = require("mongoose");

const experienceSchema = mongoose.Schema(
  {
    from: {
      type: Number,
      default: 0,
      required: true,
    },
    to: {
      type: Number,
      default: new Date().getFullYear(),
    },
    role: {
      type: String,
      default: "",
      required: true,
    },
  },
  { timestamps: true }
);

const experience = mongoose.model("experience", experienceSchema);

module.exports = experience;
