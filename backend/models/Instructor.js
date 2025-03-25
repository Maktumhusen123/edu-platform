const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 3 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: { type: String, required: true, minlength: 6 },
    bio: { type: String, trim: true, maxlength: 500 },
    expertise: { type: [String], default: [] },
    profilePicture: { type: String, default: "default-profile.png" },
    isActive: { type: Boolean, default: true },
    role: { type: String, default: "instructor" },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "rejected"],
    }, // ✅ Add status field
  },
  { timestamps: true }
);

module.exports = mongoose.model("Instructor", instructorSchema);
