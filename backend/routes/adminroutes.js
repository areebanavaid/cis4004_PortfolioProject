const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Portfolio = require("../models/Portfolio");

const authMiddleware = require("../middleware/authMiddleware");

// middleware to allow only admin users to access these routes
const adminOnly = (req, res, next) => {
  // check if logged-in user is an admin
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  // continue if user is admin
  next();
};

// GET all users - fetch all users (admin only)
router.get("/users", authMiddleware, adminOnly, async (req, res) => {
  try {
    // get all users but exclude password hash for security
    const users = await User.find().select("-passwordHash");

    // send users to frontend
    res.json(users);
  } catch (error) {
    // handle server errors
    res.status(500).json({ message: error.message });
  }
});

// DELETE user - remove a user account (admin only)
router.delete("/users/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    // find user by ID from URL
    const user = await User.findById(req.params.id);

    // if user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // delete user from database
    await user.deleteOne();

    // confirm deletion
    res.json({ message: "User deleted" });
  } catch (error) {
    // handle server errors
    res.status(500).json({ message: error.message });
  }
});

// GET all portfolios - fetch all portfolios (admin only)
router.get("/portfolios", authMiddleware, adminOnly, async (req, res) => {
  try {
    // get all portfolios and include user info (username + email)
    const portfolios = await Portfolio.find().populate("user", "username email");

    // send portfolios to frontend
    res.json(portfolios);
  } catch (error) {
    // handle server errors
    res.status(500).json({ message: error.message });
  }
});

// DELETE portfolio - remove a portfolio record (admin only)
router.delete("/portfolios/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    // find portfolio by ID
    const portfolio = await Portfolio.findById(req.params.id);

    // if portfolio not found
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    // delete portfolio from database
    await portfolio.deleteOne();

    // confirm deletion
    res.json({ message: "Portfolio deleted" });
  } catch (error) {
    // handle server errors
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;