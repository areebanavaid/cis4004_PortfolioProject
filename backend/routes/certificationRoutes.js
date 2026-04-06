const express = require("express");
const router = express.Router();
const Certification = require("../models/Certification");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const certs = await Certification.find({ user: req.user.id });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const cert = await Certification.create({ ...req.body, user: req.user.id });
    res.status(201).json(cert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const cert = await Certification.findById(req.params.id);
    if (!cert) return res.status(404).json({ message: "Not found" });
    if (cert.user.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });
    const updated = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const cert = await Certification.findById(req.params.id);
    if (!cert) return res.status(404).json({ message: "Not found" });
    if (cert.user.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });
    await cert.deleteOne();
    res.json({ message: "Certification deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;