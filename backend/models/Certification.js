const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: Date },
  description: { type: String },
  username: { type: String, required: true }
});

module.exports = mongoose.model("Certification", certificationSchema);
