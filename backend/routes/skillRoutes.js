const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");
const authMiddleware = require("../middleware/authMiddleware");

// GET skills - fetch all skills for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  // find all skills that belong to this user
  const skills = await Skill.find({ user: req.user.id });

  // send skills back to frontend
  res.json(skills);
});

// POST skill - create a new skill entry
router.post("/", authMiddleware, async (req, res) => {
  // create new skill and attach it to logged-in user
  const skill = new Skill({ ...req.body, user: req.user.id });

  // save to database
  await skill.save();

  // return created skill
  res.json(skill);
});

// DELETE skill - delete an existing skill
router.delete("/:id", authMiddleware, async (req, res) => {
  // find skill by ID from URL
  const skill = await Skill.findById(req.params.id);

  // if skill doesn't exist
  if (!skill) return res.status(404).json({ message: "Not found" });

  // check if this user owns the skill
  if (skill.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });

  // delete skill from database
  await Skill.findByIdAndDelete(req.params.id);

  // confirm deletion
  res.json({ message: "Skill deleted" });
});

// PUT skill - update an existing skill
router.put("/:id", authMiddleware, async (req, res) => {
  // find skill by ID
  const skill = await Skill.findById(req.params.id);

  // if skill doesn't exist
  if (!skill) return res.status(404).json({ message: "Not found" });

  // check ownership
  if (skill.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });

  // update skill with new data
  const updated = await Skill.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true } // return updated version
  );

  // send updated skill back
  res.json(updated);
});

module.exports = router;