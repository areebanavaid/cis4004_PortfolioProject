const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");

// GET all projects for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id }).populate("skills");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE project for logged-in user
router.post("/", authMiddleware, async (req, res) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      githubLink: req.body.githubLink,
      linkedinLink: req.body.linkedinLink,
      skills: req.body.skills || [],
      userId: req.user.id
    });

    const populatedProject = await Project.findById(project._id).populate("skills");

    res.status(201).json(populatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE project - updae an existing record 
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        githubLink: req.body.githubLink,
        linkedinLink: req.body.linkedinLink,
        skills: req.body.skills || []
      },
      { new: true, runValidators: true }
    ).populate("skills");

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE project - delete a existing project record
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;