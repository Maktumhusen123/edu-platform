exports.getInstructorDashboard = (req, res) => {
  res.json({ message: "Instructor Dashboard", user: req.user });
};
