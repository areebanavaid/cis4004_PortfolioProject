const mongoose = require("mongoose");

// DB schema for project - defines the structure and fields for project data stored in MongoDB
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    githubLink: {
      type: String,
      default: ""
    },

    linkedinLink: {
      type: String,
      default: ""
    },

    // array of skill references (many-to-many relationship with Skill)
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill"
      }
    ],

    // reference to the user who owns this project
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    // automatically adds createdAt and updatedAt timestamps
    timestamps: true
  }
);

module.exports = mongoose.model("Project", projectSchema);