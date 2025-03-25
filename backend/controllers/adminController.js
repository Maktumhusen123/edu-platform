exports.getAdminDashboard = (req, res) => {
  res.json({ message: "Admin Dashboard", user: req.user });
};
