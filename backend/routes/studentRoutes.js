const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route - only logged-in students can access
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

module.exports = router;
