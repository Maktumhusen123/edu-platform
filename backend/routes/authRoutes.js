const express = require("express");
const { signup, login } = require("../controllers/authController"); // Make sure this import is correct
const { body } = require("express-validator");

const router = express.Router();

// Signup route
router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("role").isIn(["student", "instructor"]).withMessage("Invalid role"),
  ],
  signup
);

// Login route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("role")
      .isIn(["student", "instructor", "admin"])
      .withMessage("Invalid role"),
  ],
  login
);

module.exports = router;
