let mongoose = require("mongoose");

let skillSchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
    required: true,
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

let skills = mongoose.model("skill", skillSchema);

module.exports = skills;
