const express = require("express");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");
const {
  enrollInCourse,
  getAllEnrollments,
  getEnrollmentByStudent,
  updateProgress,
  deleteEnrollment,
} = require("../controllers/enrollmentController");

const router = express.Router();

// 🔹 Enroll in a course (Students only)
router.post("/enroll", verifyToken, authorizeRoles("student"), enrollInCourse);

// 🔹 Get all enrollments (Admins only, with pagination)
router.get(
  "/get-enrollments",
  verifyToken,
  authorizeRoles("admin", "instructor"),
  getAllEnrollments
);

// 🔹 Get a student’s enrollment details
router.get(
  "/student/:studentId",
  verifyToken,
  authorizeRoles("student", "admin"),
  getEnrollmentByStudent
);

// 🔹 Update progress (Students only)
router.put(
  "/update-progress/:enrollmentId",
  verifyToken,
  authorizeRoles("student"),
  updateProgress
);

// 🔹 Delete an enrollment (Admins only)
router.delete(
  "/delete/:enrollmentId",
  verifyToken,
  authorizeRoles("admin"),
  deleteEnrollment
);

module.exports = router;
