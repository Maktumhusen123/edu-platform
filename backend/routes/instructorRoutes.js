const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Middleware to check if instructor is approved
const isApprovedInstructor = (req, res, next) => {
  if (req.user.role !== "instructor" || req.user.status !== "approved") {
    return res
      .status(403)
      .json({ message: "Access denied. Instructor not approved." });
  }
  next();
};

// ✅ Instructor Dashboard Route
router.get("/dashboard", verifyToken, isApprovedInstructor, (req, res) => {
  res.json({ message: "Welcome to instructor dashboard!" });
});

module.exports = router;
