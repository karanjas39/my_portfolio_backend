const mongoose = require("mongoose");

const rolesSchema = mongoose.Schema({
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

const roles = mongoose.model("roles", rolesSchema);

module.exports = roles;
