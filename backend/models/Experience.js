const mongoose = require("mongoose");

// DB Schema for experience - defines structure of experience data in MongoDB
const experienceSchema = new mongoose.Schema(
  {
    // reference to the user who owns this experience record
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    company: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    startDate: {
      type: String,
      default: ""
    },
    endDate: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", experienceSchema);