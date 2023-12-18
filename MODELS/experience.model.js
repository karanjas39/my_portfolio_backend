const mongoose = require("mongoose");

const experienceSchema = mongoose.Schema({
  from: {
    type: Number,
    default: 0,
    required: true,
  },
  to: {
    type: Number,
    default: 0,
  },
  role: {
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

const experience = mongoose.model("experience", experienceSchema);

module.exports = experience;
