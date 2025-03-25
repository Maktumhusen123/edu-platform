const Instructor = require("../models/Instructor");

exports.approveInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor)
      return res.status(404).json({ message: "Instructor not found" });

    instructor.status = "approved";
    await instructor.save();

    res.status(200).json({
      message: "Instructor approved successfully",
      instructor, // ✅ Return updated instructor data
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.rejectInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor)
      return res.status(404).json({ message: "Instructor not found" });

    instructor.status = "rejected";
    await instructor.save();

    res.status(200).json({ message: "Instructor rejected successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getAdminDashboard = (req, res) => {
  res.json({ message: "Admin Dashboard", user: req.user });
};

exports.getPendingInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find({ status: "pending" });
    res.status(200).json(instructors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
