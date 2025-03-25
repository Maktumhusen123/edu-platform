const Course = require("../models/Course");
const User = require("../models/User"); // Use the unified User model

// ✅ Create a Course (Only Instructors)
exports.createCourse = async (req, res) => {
  try {
    // Check if the user is an instructor
    if (req.user.role !== "instructor") {
      return res.status(403).json({
        message: "Access denied. Only instructors can create courses.",
      });
    }

    const { title, description, price } = req.body;
    const newCourse = await Course.create({
      title,
      description,
      price,
      instructor: req.user.id, // Instructor ID from JWT
    });
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get All Courses (For everyone to see available courses)
exports.getCourses = async (req, res) => {
  try {
    // Fetch all courses and populate the instructor's name
    const courses = await Course.find().populate("instructor", "name");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get a Course by ID (For everyone to see details of a specific course)
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)
      .populate("instructor", "name email") // Make sure the ref is correctly populated
      .populate({
        path: "lessons", // Assuming lessons are embedded or referenced in Course model
        select: "title content video createdAt", // Only fetch these fields for lessons
      });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course); // Send the course details as response
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Enroll in a Course (Only for students)
exports.enrollCourse = async (req, res) => {
  try {
    // Check if the user is a student
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Access denied. Only students can enroll in courses.",
      });
    }

    const student = await User.findById(req.user.id); // Use the unified User model
    if (!student) return res.status(404).json({ message: "Student not found" });

    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (student.coursesEnrolled.includes(course._id)) {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }

    student.coursesEnrolled.push(course._id);
    await student.save();

    res.status(200).json({ message: "Enrollment successful", course });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
