let mongoose = require("mongoose");

let skillSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
      required: true,
    },
  },
  { timestamps: true }
);

let skills = mongoose.model("skill", skillSchema);

module.exports = skills;
