const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");
const authMiddleware = require("../middleware/authMiddleware");

// GET portfolio - fetch all portfolio records for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ user: req.user.id });

    if (!portfolio) {
      portfolio = await Portfolio.create({ user: req.user.id });
    }

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT portfolio - update an existing portfolio record
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    if (portfolio.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedPortfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;