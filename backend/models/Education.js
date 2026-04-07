const mongoose = require("mongoose");

// DB Schema for education - defines structure of education data in MongoDB
const educationSchema = new mongoose.Schema(
  {
    // reference to the user who owns this education record
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    school: {
      type: String,
      required: true
    },
    degree: {
      type: String,
      required: true
    },
    fieldOfStudy: {
      type: String,
      default: ""
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
  { timestamps: true } // automatically adds createdAt and updatedAt timestamps
);

module.exports = mongoose.model("Education", educationSchema);