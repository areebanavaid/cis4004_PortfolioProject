const mongoose = require("mongoose");

// DB schema for user - defines the structure and fields for user data stored in MongoDB
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true // removes extra spaces
    },

    email: {
      type: String,
      required: true,
      unique: true,     // no duplicate emails allowed
      lowercase: true,  // store email in lowercase
      trim: true
    },

    // stores hashed password for security
    passwordHash: {
      type: String,
      required: true
    },

    // defines user role (standard or admin)
    role: {
      type: String,
      enum: ["standard", "admin"],
      default: "standard"
    }
  },
  {
    // automatically adds createdAt and updatedAt
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);