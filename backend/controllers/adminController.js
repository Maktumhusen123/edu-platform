const User = require("../models/User"); // Import the unified User model

// ✅ Approve Instructor
exports.approveInstructor = async (req, res) => {
  try {
    const instructor = await User.findById(req.params.id); // Use the User model
    if (!instructor || instructor.role !== "instructor")
      return res.status(404).json({ message: "Instructor not found" });

    instructor.status = "approved"; // Update status to 'approved'
    await instructor.save();

    res.status(200).json({
      message: "Instructor approved successfully",
      instructor, // Return updated instructor data
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Reject Instructor
exports.rejectInstructor = async (req, res) => {
  try {
    const instructor = await User.findById(req.params.id); // Use the User model
    if (!instructor || instructor.role !== "instructor")
      return res.status(404).json({ message: "Instructor not found" });

    instructor.status = "rejected"; // Update status to 'rejected'
    await instructor.save();

    res.status(200).json({ message: "Instructor rejected successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Admin Dashboard
exports.getAdminDashboard = (req, res) => {
  res.json({ message: "Admin Dashboard", user: req.user });
};

// ✅ Get Pending Instructors
exports.getPendingInstructors = async (req, res) => {
  try {
    const instructors = await User.find({
      role: "instructor",
      status: "pending",
    }); // Use the unified User model to get pending instructors
    res.status(200).json(instructors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
