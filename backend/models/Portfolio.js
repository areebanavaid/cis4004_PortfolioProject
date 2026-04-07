const mongoose = require("mongoose");

// DB schema for portfolio - defines structure of portfolio data in MongoDB
const portfolioSchema = new mongoose.Schema(
  {
    // reference to the user who owns this portfolio record
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    bio: {
      type: String,
      default: ""
    },
    github: {
      type: String,
      default: ""
    },
    linkedin: {
      type: String,
      default: ""
    },
    website: {
      type: String,
      default: ""
    },
    displayName: { 
      type: String, default: "" 
    },
    profilePic:  { 
      type: String, default: "" 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);