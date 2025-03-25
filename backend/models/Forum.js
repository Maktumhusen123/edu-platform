const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "userType",
      required: true,
    },
    userType: { type: String, enum: ["Student", "Instructor"], required: true },
    question: { type: String, required: true },
    answers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "userType",
          required: true,
        },
        userType: {
          type: String,
          enum: ["Student", "Instructor"],
          required: true,
        },
        answer: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Forum", forumSchema);
