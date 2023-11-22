const mongoose = require("mongoose");

const rolesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
      required: true,
    },
  },
  { timestamps: true }
);

const roles = mongoose.model("roles", rolesSchema);

module.exports = roles;
