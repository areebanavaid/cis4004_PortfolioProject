const express = require("express");
const router = express.Router();
const Certification = require("../models/Certification");
const authMiddleware = require("../middleware/authMiddleware");

// GET all certs for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const certs = await Certification.find({ username: req.user.username });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET public portfolio certs by username
router.get("/user/:username", async (req, res) => {
  try {
    const certs = await Certification.find({ username: req.params.username });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new cert
router.post("/", authMiddleware, async (req, res) => {
  try {
    const cert = new Certification({
      ...req.body,
      username: req.user.username
    });

    const saved = await cert.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update cert (only owner)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const cert = await Certification.findOne({
      _id: req.params.id,
      username: req.user.username
    });

    if (!cert) {
      return res.status(403).json({ message: "Not authorized" });
    }

    cert.title = req.body.title ?? cert.title;
    cert.issuer = req.body.issuer ?? cert.issuer;
    cert.date = req.body.date ?? cert.date;
    cert.description = req.body.description ?? cert.description;

    const updated = await cert.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE cert (only owner)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const cert = await Certification.findOne({
      _id: req.params.id,
      username: req.user.username
    });

    if (!cert) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Certification.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
