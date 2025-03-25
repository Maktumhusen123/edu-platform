const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    // Role-specific fields
    bio: {
      type: String,
      trim: true,
      maxlength: 500,
      validate: {
        validator: function (value) {
          if (this.role === "instructor" && !value) {
            return false; // bio is required for instructors
          }
          return true; // bio is not required for other roles
        },
        message: "Bio is required for instructors.",
      },
    },
    expertise: {
      type: String,
      validate: {
        validator: function (value) {
          // Check if role is "instructor" and expertise is an empty array
          if (this.role === "instructor" && value.length === 0) {
            return false; // expertise cannot be empty for instructors
          }
          return true; // expertise can be empty for non-instructors
        },
        message: "Expertise is required for instructors.",
      },
    },
    profilePicture: {
      type: String,
      default: "default-profile.png",
      validate: {
        validator: function (value) {
          if (this.role === "instructor" && !value) {
            return false; // profilePicture is required for instructors
          }
          return true; // profilePicture is not required for other roles
        },
        message: "Profile picture is required for instructors.",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
      validate: {
        validator: function (value) {
          if (this.role === "instructor" && value === undefined) {
            return false; // isActive is required for instructors
          }
          return true; // isActive is not required for other roles
        },
        message: "isActive is required for instructors.",
      },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      validate: {
        validator: function (value) {
          if (this.role === "instructor" && !value) {
            return false; // status is required for instructors
          }
          return true; // status is not required for other roles
        },
        message: "Status is required for instructors.",
      },
    },
    coursesEnrolled: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Course",
      default: [],
      required: function () {
        return this.role === "student"; // Only students have this field
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
