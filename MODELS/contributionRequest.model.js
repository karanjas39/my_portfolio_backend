const mongoose = require("mongoose");

const contributionRequestSchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  whatsapp_number: {
    type: Number,
    default: 0,
  },
  project_id: {
    type: mongoose.Types.ObjectId,
    ref: "projects",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const contributionRequest = mongoose.model(
  "contribution_request",
  contributionRequestSchema
);

module.exports = contributionRequest;
