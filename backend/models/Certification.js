const mongoose = require("mongoose");

// DB schema for certification - defines structure of certification data in MongoDB
const certificationSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  issuer:      { type: String, required: true },
  date:        { type: Date },
  description: { type: String },
  user:        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // reference to the user who owns this certification
});

module.exports = mongoose.model("Certification", certificationSchema);