const mongoose = require("mongoose");

let developerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    cv_link: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

let developer = mongoose.model("developer", developerSchema);

module.exports = developer;
