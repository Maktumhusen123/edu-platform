const {
  getAdminDashboard,
  getPendingInstructors,
  approveInstructor,
  rejectInstructor,
} = require("../controllers/adminController");

const express = require("express");
const { isAdmin } = require("../middleware/authMiddleware");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Admin Dashboard
router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("admin"),
  getAdminDashboard
);

// ✅ Get All Pending Instructors
router.get(
  "/pending-instructors",
  verifyToken,
  authorizeRoles("admin"),
  getPendingInstructors
);

// ✅ Approve Instructor
router.put(
  "/approve-instructor/:id",
  verifyToken,
  authorizeRoles("admin"),
  approveInstructor
);

// ✅ Reject Instructor
router.delete(
  "/reject-instructor/:id",
  verifyToken,
  authorizeRoles("admin"),
  rejectInstructor
);

module.exports = router;
