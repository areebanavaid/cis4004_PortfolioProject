const express = require("express");
const router = express.Router();
const Education = require("../models/Education");
const authMiddleware = require("../middleware/authMiddleware");

// GET education - fetch all education records for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    // find all education entries that belong to this user
    const educationRecords = await Education.find({ user: req.user.id });

    // send results back to frontend
    res.json(educationRecords);
  } catch (error) {
    // handle server errors
    res.status(500).json({ message: error.message });
  }
});

// POST new education - create a new education entry
router.post("/", authMiddleware, async (req, res) => {
  try {
    // create new education and attach it to logged-in user
    const newEducation = await Education.create({
      ...req.body,
      user: req.user.id
    });

    // return created education record
    res.status(201).json(newEducation);
  } catch (error) {
    // handle server errors
    res.status(500).json({ message: error.message });
  }
});

// PUT education - update an existing education record
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    // find education by ID
    const education = await Education.findById(req.params.id);

    // if not found
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    // check ownership (user can only edit their own data)
    if (education.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // update education with new data
    const updatedEducation = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated version
    );

    // send updated record back
    res.json(updatedEducation);
  } catch (error) {
    // handle server errors
    res.status(500).json({ message: error.message });
  }
});

// DELETE education - delete an education record
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    // find education by ID
    const education = await Education.findById(req.params.id);

    // if not found
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    // check ownership
    if (education.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // delete from database
    await education.deleteOne();

    // confirm deletion
    res.json({ message: "Education deleted successfully" });
  } catch (error) {
    // handle server errors
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;