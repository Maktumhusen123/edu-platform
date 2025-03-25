const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import the unified User model

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
    console.log("Decoded JWT:", decoded); // Log decoded JWT to check structure

    req.user = decoded; // Attach decoded user data to request
    next(); // Proceed to next middleware or controller
  } catch (error) {
    console.log("JWT Error:", error); // Log error for debugging
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyToken };

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

// ✅ Middleware to check if instructor is approved
const isApprovedInstructor = async (req, res, next) => {
  if (req.user.role !== "instructor") {
    return res
      .status(403)
      .json({ message: "Access denied. Not an instructor." });
  }

  // ✅ Fetch user from DB (since all roles are in User model now)
  const instructor = await User.findById(req.user.id);
  if (!instructor || instructor.status !== "approved") {
    return res
      .status(403)
      .json({ message: "Access denied. Instructor not approved." });
  }

  next();
};

module.exports = { verifyToken, authorizeRoles, isApprovedInstructor };
