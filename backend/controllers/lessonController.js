const fs = require("fs");
const path = require("path");
const Lesson = require("../models/Lessons");

// Helper function to delete video file
const deleteVideoFile = (videoPath) => {
  if (videoPath) {
    const fullPath = path.join(__dirname, "..", videoPath);
    fs.unlink(fullPath, (err) => {
      if (err) console.error("Failed to delete video:", err);
    });
  }
};

// Create a new lesson
exports.createLesson = async (req, res) => {
  try {
    const { title, content, course } = req.body;

    const newLesson = new Lesson({
      title,
      content,
      course,
      video: req.file
        ? {
            filename: req.file.originalname,
            path: req.file.path,
            size: req.file.size,
            mimeType: req.file.mimetype,
          }
        : null,
    });

    await newLesson.save();
    res
      .status(201)
      .json({ message: "Lesson created successfully", lesson: newLesson });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating lesson", error: error.message });
  }
};

// Get all lessons with pagination, sorting, and filtering
exports.getAllLessons = async (req, res) => {
  try {
    let { page, limit, sort, course, title } = req.query;

    // Default values
    page = parseInt(page) || 1; // Default page = 1
    limit = parseInt(limit) || 10; // Default limit = 10 lessons per page
    const skip = (page - 1) * limit;

    // Build query object for filtering
    let query = {};
    if (course) query.course = course; // Filter by course ID
    if (title) query.title = new RegExp(title, "i"); // Case-insensitive title search

    // Sorting options
    let sortOption = {};
    if (sort === "newest") sortOption.createdAt = -1; // Sort by newest first
    else if (sort === "oldest") sortOption.createdAt = 1; // Sort by oldest first

    // Fetch lessons with pagination, sorting & filtering
    const lessons = await Lesson.find(query)
      .populate("course")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    // Get total lesson count after filtering
    const totalLessons = await Lesson.countDocuments(query);
    const totalPages = Math.ceil(totalLessons / limit);

    res.status(200).json({
      message: "Lessons retrieved successfully",
      lessons,
      pagination: {
        totalLessons,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching lessons", error: error.message });
  }
};

// Get a single lesson by ID
exports.getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate("course");
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    res.status(200).json({ message: "Lesson retrieved successfully", lesson });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching lesson", error: error.message });
  }
};

// Update a lesson (with optional video update)
exports.updateLesson = async (req, res) => {
  try {
    const { title, content, course } = req.body;

    // Find existing lesson
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    // If new video is uploaded, delete the old one
    if (req.file && lesson.video?.path) {
      deleteVideoFile(lesson.video.path);
    }

    lesson.title = title || lesson.title;
    lesson.content = content || lesson.content;
    lesson.course = course || lesson.course;

    if (req.file) {
      lesson.video = {
        filename: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
        mimeType: req.file.mimetype,
      };
    }

    await lesson.save();
    res.status(200).json({ message: "Lesson updated successfully", lesson });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating lesson", error: error.message });
  }
};

// Delete a lesson (and remove associated video)
exports.deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    // Delete associated video
    if (lesson.video?.path) {
      deleteVideoFile(lesson.video.path);
    }

    await Lesson.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting lesson", error: error.message });
  }
};
