const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Student = require("../models/Student");
const Instructor = require("../models/Instructor");
const Admin = require("../models/Admin");

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ✅ User Signup
exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    let userModel;

    // Check user role & model
    if (role === "student") userModel = Student;
    else if (role === "instructor") userModel = Instructor;
    else if (role === "admin")
      return res
        .status(403)
        .json({ message: "Admin accounts cannot be created via signup" });
    else return res.status(400).json({ message: "Invalid role" });

    // Check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
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
  const { email, password, role } = req.body;

  try {
    let userModel;

    // Determine user model based on role
    if (role === "student") userModel = Student;
    else if (role === "instructor") userModel = Instructor;
    else if (role === "admin") userModel = Admin;
    else return res.status(400).json({ message: "Invalid role" });

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email, role },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
