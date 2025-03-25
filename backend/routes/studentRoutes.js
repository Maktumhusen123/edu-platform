const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const User = require("../models/User"); // Import the unified User model

const router = express.Router();

// Middleware to check if the user is a student
const isStudent = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // Fetch the user from the DB
    if (!user || user.role !== "student") {
      return res
        .status(403)
        .json({
          message: "Access denied. Only students can access this route.",
        });
    }
    next(); // Proceed if the user is a student
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Student Profile Route - accessible only by students
router.get("/profile", verifyToken, isStudent, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

module.exports = router;
