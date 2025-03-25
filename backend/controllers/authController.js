const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

// Generate JWT Token
// Generate JWT Token
const generateToken = (user) => {
  // If user is an instructor, include the status field in the token
  const tokenPayload = {
    id: user._id.toString(),
    role: user.role,
  };

  // Include status only for instructors
  if (user.role === "instructor") {
    tokenPayload.status = user.status;
  }

  return jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ✅ User Signup
exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    // Check if role is valid
    if (!["student", "instructor", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Additional fields for instructor
    let additionalFields = {};
    if (role === "instructor") {
      additionalFields.status = "pending"; // Set instructor status to pending
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      ...additionalFields, // Add role-specific fields like status for instructors
    });

    // Save the user
    await newUser.save();

    // If instructor, notify of pending approval
    if (role === "instructor") {
      return res
        .status(201)
        .json({ message: "Signup successful. Awaiting admin approval." });
    }

    // For students and admins, generate token & respond
    const token = generateToken(newUser);
    res.status(201).json({
      message: "Signup successful",
      token,
      user: { id: newUser._id, name, email, role },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email (no need to check for role here)
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Prevent login for pending instructors
    if (user.role === "instructor" && user.status === "pending") {
      return res.status(403).json({
        message:
          "Your account is pending approval. Please wait for admin approval.",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token, // Send the token
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // Include role from the database
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Approve Instructor (Instructor approval by admin)
exports.approveInstructor = async (req, res) => {
  try {
    const instructor = await User.findById(req.params.id);
    if (!instructor || instructor.role !== "instructor")
      return res.status(404).json({ message: "Instructor not found" });

    instructor.status = "approved"; // Set instructor status to approved
    await instructor.save();

    res.status(200).json({ message: "Instructor approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Reject Instructor (Instructor rejection by admin)
exports.rejectInstructor = async (req, res) => {
  try {
    const instructor = await User.findById(req.params.id);
    if (!instructor || instructor.role !== "instructor")
      return res.status(404).json({ message: "Instructor not found" });

    instructor.status = "rejected"; // Set instructor status to rejected
    await instructor.save();

    res.status(200).json({ message: "Instructor rejected successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
