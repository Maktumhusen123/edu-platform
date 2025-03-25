const express = require("express");
const multer = require("multer");
const {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
} = require("../controllers/lessonController");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// Multer storage configuration (local storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/videos/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Only instructors can create lessons
router.post(
  "/create-lesson",
  verifyToken,
  authorizeRoles("instructor"),
  upload.single("video"),
  createLesson
);

// Publicly accessible routes
router.get("/get-lessons", getAllLessons);
router.get("/get-lesson /:id", getLessonById);

// ✅ Only instructors can update lessons
router.put(
  "/update-lesson/:id",
  verifyToken,
  authorizeRoles("instructor"),
  upload.single("video"),
  updateLesson
);

// ✅ Only instructors can delete lessons
router.delete(
  "/delete-lesson/:id",
  verifyToken,
  authorizeRoles("instructor"),
  deleteLesson
);

module.exports = router;
