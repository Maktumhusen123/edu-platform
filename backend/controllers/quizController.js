const Quiz = require("../models/Quiz");

// 🔹 Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    const { course, questions } = req.body;

    // Ensure the course ID is provided
    if (!course)
      return res.status(400).json({ message: "Course ID is required" });

    // Check for an existing quiz for the course
    const existingQuiz = await Quiz.findOne({ course });
    if (existingQuiz) {
      return res
        .status(400)
        .json({ message: "Quiz already exists for this course" });
    }

    // Create a new quiz
    const newQuiz = new Quiz({ course, questions });
    await newQuiz.save();

    res.status(201).json({ message: "Quiz created successfully", newQuiz });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating quiz", error: error.message });
  }
};

// 🔹 Get all quizzes with pagination & filtering
exports.getAllQuizzes = async (req, res) => {
  try {
    let { page, limit, course } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};
    if (course) query.course = course; // Filter by course

    const quizzes = await Quiz.find(query)
      .populate("course")
      .skip(skip)
      .limit(limit);

    const totalQuizzes = await Quiz.countDocuments(query);
    const totalPages = Math.ceil(totalQuizzes / limit);

    res.status(200).json({
      message: "Quizzes retrieved successfully",
      quizzes,
      pagination: {
        totalQuizzes,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching quizzes", error: error.message });
  }
};

// 🔹 Get a single quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("course");
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.status(200).json({ message: "Quiz retrieved successfully", quiz });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching quiz", error: error.message });
  }
};

// 🔹 Update a quiz
exports.updateQuiz = async (req, res) => {
  try {
    const { questions } = req.body;

    // Validate question structure
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Invalid questions format" });
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { questions },
      { new: true }
    );

    if (!updatedQuiz)
      return res.status(404).json({ message: "Quiz not found" });

    res.status(200).json({ message: "Quiz updated successfully", updatedQuiz });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating quiz", error: error.message });
  }
};

// 🔹 Delete a quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!deletedQuiz)
      return res.status(404).json({ message: "Quiz not found" });

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting quiz", error: error.message });
  }
};
