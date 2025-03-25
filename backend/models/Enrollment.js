const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100, // Ensures valid progress range
    },
    completed: { type: Boolean, default: false },
    lessonProgress: [
      {
        lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
        completed: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

// Automatically mark course as completed when progress reaches 100%
enrollmentSchema.pre("save", function (next) {
  this.completed = this.progress >= 100;
  next();
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
