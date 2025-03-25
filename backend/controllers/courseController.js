const Course = require("../models/Course");
const Student = require("../models/Student");

// ✅ Create a Course (Only Instructors)
exports.createCourse = async (req, res) => {
  try {
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

// ✅ Get All Courses (For students to see available courses)
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get a Course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)
      .populate("instructor", "name email")
      .populate({
        path: "lessons",
        select: "title content video createdAt",
      });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Enroll in a Course (Only for students)
exports.enrollCourse = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (student.courses.includes(course._id)) {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }

    student.courses.push(course._id);
    await student.save();

    res.status(200).json({ message: "Enrollment successful", course });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
