const express = require("express");
const router = express.Router();
const Certification = require("../models/Certification");
const authMiddleware = require("../middleware/authMiddleware");

// GET certification - fetch all certification records for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    // find all certifications that belong to this user
    const certs = await Certification.find({ user: req.user.id });

    // send results back to frontend
    res.json(certs);
  } catch (err) {
    // handle server errors
    res.status(500).json({ message: err.message });
  }
});

// POST certification - create a new certification record
router.post("/", authMiddleware, async (req, res) => {
  try {
    // create new certification and attach it to logged-in user
    const cert = await Certification.create({
      ...req.body,
      user: req.user.id
    });

    // return created certification
    res.status(201).json(cert);
  } catch (err) {
    // handle server errors
    res.status(500).json({ message: err.message });
  }
});

// PUT certification - update an existing certification record
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    // find certification by ID
    const cert = await Certification.findById(req.params.id);

    // if not found
    if (!cert) return res.status(404).json({ message: "Not found" });

    // check ownership
    if (cert.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    // update certification with new data
    const updated = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated version
    );

    // send updated certification back
    res.json(updated);
  } catch (err) {
    // handle server errors
    res.status(500).json({ message: err.message });
  }
});

// DELETE certification - delete a certification record
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    // find certification by ID
    const cert = await Certification.findById(req.params.id);

    // if not found
    if (!cert) return res.status(404).json({ message: "Not found" });

    // check ownership
    if (cert.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    // delete certification from database
    await cert.deleteOne();

    // confirm deletion
    res.json({ message: "Certification deleted" });
  } catch (err) {
    // handle server errors
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;