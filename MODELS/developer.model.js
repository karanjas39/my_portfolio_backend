const mongoose = require("mongoose");

let developerSchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  cv_link: {
    type: String,
    default: "",
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

let developer = mongoose.model("developer", developerSchema);

module.exports = developer;
