const express = require("express");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");
const {
  getInstructorDashboard,
} = require("../controllers/instructorController");

const router = express.Router();

router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("instructor"),
  getInstructorDashboard
);

module.exports = router;
