const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// 🔹 Enroll in a course
exports.enrollInCourse = async (req, res) => {
  try {
    const { student, course } = req.body;

    // Check if enrollment already exists
    const existingEnrollment = await Enrollment.findOne({ student, course });
    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }

    // Create new enrollment
    const newEnrollment = new Enrollment({ student, course });
    await newEnrollment.save();

    res.status(201).json({ message: "Enrolled successfully", newEnrollment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error enrolling in course", error: error.message });
  }
};

// 🔹 Get all enrollments with pagination
exports.getAllEnrollments = async (req, res) => {
  try {
    let { page, limit, student, course } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};
    if (student) query.student = student;
    if (course) query.course = course;

    const enrollments = await Enrollment.find(query)
      .populate("student course")
      .skip(skip)
      .limit(limit);

    const totalEnrollments = await Enrollment.countDocuments(query);
    const totalPages = Math.ceil(totalEnrollments / limit);

    res.status(200).json({
      message: "Enrollments retrieved successfully",
      enrollments,
      pagination: { totalEnrollments, totalPages, currentPage: page, limit },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching enrollments", error: error.message });
  }
};

// 🔹 Get a student’s enrollment details
exports.getEnrollmentByStudent = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.params.studentId,
    }).populate("course");

    if (!enrollments.length)
      return res
        .status(404)
        .json({ message: "No enrollments found for this student" });

    res.status(200).json({ message: "Enrollments retrieved", enrollments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching enrollments", error: error.message });
  }
};

// 🔹 Update progress
exports.updateProgress = async (req, res) => {
  try {
    const { progress } = req.body;
    if (progress < 0 || progress > 100) {
      return res.status(400).json({ message: "Invalid progress value" });
    }

    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.enrollmentId,
      { progress, completed: progress >= 100 },
      { new: true }
    );

    if (!enrollment)
      return res.status(404).json({ message: "Enrollment not found" });

    res
      .status(200)
      .json({ message: "Progress updated successfully", enrollment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating progress", error: error.message });
  }
};

// 🔹 Delete an enrollment
exports.deleteEnrollment = async (req, res) => {
  try {
    const deletedEnrollment = await Enrollment.findByIdAndDelete(
      req.params.enrollmentId
    );
    if (!deletedEnrollment)
      return res.status(404).json({ message: "Enrollment not found" });

    res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting enrollment", error: error.message });
  }
};
