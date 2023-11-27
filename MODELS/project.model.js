const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const project = mongoose.model("project", projectSchema);

module.exports = project;
