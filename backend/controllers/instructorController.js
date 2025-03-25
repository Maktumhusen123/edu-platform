const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment"); // To track enrolled students

exports.getInstructorDashboard = async (req, res) => {
  try {
    const instructorId = req.user.id;

    // Fetch the instructor's courses
    const courses = await Course.find({ instructor: instructorId });

    // Fetch the number of students enrolled in each course
    const enrollmentStats = await Promise.all(
      courses.map(async (course) => {
        const enrollments = await Enrollment.find({ course: course._id });
        return {
          course: course.title,
          numberOfEnrollments: enrollments.length,
        };
      })
    );

    // Return instructor dashboard data
    res.status(200).json({
      message: "Instructor Dashboard",
      user: req.user,
      courses: courses,
      enrollmentStats: enrollmentStats, // Number of enrollments per course
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
