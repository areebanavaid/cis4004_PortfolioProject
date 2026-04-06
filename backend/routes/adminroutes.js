const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Portfolio = require("../models/Portfolio");

const authMiddleware = require("../middleware/authMiddleware");

// Admin check middleware
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

// GET all users
router.get("/users", authMiddleware, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete("/users/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all portfolios
router.get("/portfolios", authMiddleware, adminOnly, async (req, res) => {
  try {
    const portfolios = await Portfolio.find().populate("user", "username email");
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE portfolio
router.delete("/portfolios/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    await portfolio.deleteOne();

    res.json({ message: "Portfolio deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
