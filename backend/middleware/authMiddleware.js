const jwt = require("jsonwebtoken");
const Instructor = require("../models/Instructor");

// ✅ Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer token

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach decoded user data to request
    next(); // Proceed to next middleware or controller
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

// ✅ Middleware for role-based access control
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access Denied. Insufficient Permissions." });
    }
    next();
  };
};

const isApprovedInstructor = async (req, res, next) => {
  if (req.user.role !== "instructor") {
    return res.status(403).json({ message: "Access denied" });
  }

  // ✅ Fetch instructor from DB
  const instructor = await Instructor.findById(req.user.id);
  if (!instructor || instructor.status !== "approved") {
    return res
      .status(403)
      .json({ message: "Access denied. Instructor not approved." });
  }

  next();
};

module.exports = { verifyToken, authorizeRoles, isApprovedInstructor };
