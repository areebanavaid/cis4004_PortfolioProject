const mongoose = require("mongoose");

// DB schema for skill - defines the structure and fields for skill data stored in MongoDB
const skillSchema = new mongoose.Schema({
  // reference to the user who owns this skill
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // name of the skill (e.g., Java, React)
  name: {
    type: String,
    required: true
  },

  // category of the skill (limited to predefined values)
  category: {
    type: String,
    enum: ["Language", "Framework", "Tool", "Technology", "Certification", "Other Skills"],
    required: true
  },

  // skill level with default value
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner"
  }
});

module.exports = mongoose.model("Skill", skillSchema);