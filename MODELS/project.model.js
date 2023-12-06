const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    default: "",
    required: true,
  },
  brief_description: {
    type: String,
    default: "",
    required: true,
  },
  detailed_description: {
    type: String,
    default: "",
    required: true,
  },
  links: [
    {
      link_title: { type: String, default: "", required: true },
      link_url: { type: String, default: "", required: true },
    },
  ],
  techStack: [
    {
      techId: {
        type: mongoose.Types.ObjectId,
        ref: "skill",
      },
    },
  ],
  active: {
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

const project = mongoose.model("project", projectSchema);

module.exports = project;
