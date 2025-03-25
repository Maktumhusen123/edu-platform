const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    questions: [
      {
        questionText: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswers: [{ type: Number, required: true }], // Array of indices (0-based) for correct options
        createdAt: { type: Date, default: Date.now }, // Timestamp for tracking
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
