const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const User = require("../models/User"); // Import the unified User model

const router = express.Router();

// Middleware to check if the user is an approved instructor
const isApprovedInstructor = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // Fetch the user from the DB
    if (!user || user.role !== "instructor" || user.status !== "approved") {
      return res
        .status(403)
        .json({ message: "Access denied. Instructor not approved." });
    }
    next(); // Proceed if the user is an approved instructor
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Instructor Dashboard Route
router.get(
  "/instructor-dashboard",
  verifyToken,
  isApprovedInstructor,
  (req, res) => {
    res.json({ message: "Welcome to instructor dashboard!" });
  }
);

module.exports = router;
