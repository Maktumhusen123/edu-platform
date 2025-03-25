const express = require("express");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");
const {
  createCourse,
  getCourses,
  enrollCourse,
  getCourseById,
} = require("../controllers/courseController");

const router = express.Router();

router.post(
  "/create-course",
  verifyToken,
  authorizeRoles("instructor"),
  createCourse
); // ✅ Only instructors can create courses
router.get("/get-course", verifyToken, getCourses); // ✅ Any logged-in user can view courses
router.get("/get-course/:courseId", getCourseById);
router.post(
  "/enroll/:courseId",
  verifyToken,
  authorizeRoles("student"),
  enrollCourse
); // ✅ Only students can enroll

module.exports = router;
