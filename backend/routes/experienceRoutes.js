const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience");
const authMiddleware = require("../middleware/authMiddleware");

// GET experience - fetch all experience records for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    // find all experience entries for this user
    const experienceRecords = await Experience.find({ user: req.user.id });

    // send results back
    res.json(experienceRecords);
  } catch (error) {
    // handle server errors
    res.status(500).json({ message: error.message });
  }
});

// POST experience - create a new experience record
router.post("/", authMiddleware, async (req, res) => {
  try {
    // create new experience and attach user
    const newExperience = await Experience.create({
      ...req.body,
      user: req.user.id
    });

    // return created record
    res.status(201).json(newExperience);
  } catch (error) {
    // handle server errors
    res.status(500).json({ message: error.message });
  }
});

// PUT experience - update an existing experience record
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    // find experience by ID
    const experience = await Experience.findById(req.params.id);

    // if not found
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // check ownership
    if (experience.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // update with new data
    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // send updated record
    res.json(updatedExperience);
  } catch (error) {
    // handle server errors
    res.status(500).json({ message: error.message });
  }
});

// DELETE experience - delete an experience record
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    // find experience by ID
    const experience = await Experience.findById(req.params.id);

    // if not found
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // check ownership
    if (experience.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // delete from database
    await experience.deleteOne();

    // confirm deletion
    res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    // handle server errors
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;