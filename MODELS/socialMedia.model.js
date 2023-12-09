const mongoose = require("mongoose");

const socialMediaSchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
  icon: {
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

const socialMedia = mongoose.model("socialMedia", socialMediaSchema);

module.exports = socialMedia;
