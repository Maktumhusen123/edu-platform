const express = require("express");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");
const { getAdminDashboard } = require("../controllers/adminController");

const router = express.Router();

router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("admin"),
  getAdminDashboard
);

module.exports = router;
