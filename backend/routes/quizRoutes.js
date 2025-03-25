const express = require("express");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");
const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quizController");

const router = express.Router();

// 🔹 Create a new quiz (Instructor only)
router.post(
  "/create-quiz",
  verifyToken,
  authorizeRoles("instructor"),
  createQuiz
);

// 🔹 Get all quizzes (with pagination & filtering)
router.get("/get-quiz", getAllQuizzes);

// 🔹 Get a single quiz by ID
router.get("/get-quiz/:id", getQuizById);

// 🔹 Update a quiz (Instructor only)
router.put(
  "/update-quiz/:id",
  verifyToken,
  authorizeRoles("instructor"),
  updateQuiz
);

// 🔹 Delete a quiz (Instructor only)
router.delete(
  "/delete-quiz/:id",
  verifyToken,
  authorizeRoles("instructor"),
  deleteQuiz
);

module.exports = router;
