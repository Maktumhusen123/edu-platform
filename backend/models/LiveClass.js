const mongoose = require("mongoose");

const liveClassSchema = new mongoose.Schema(
  {
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    startTime: { type: Date, required: true },
    duration: { type: Number, required: true }, // Duration in minutes
    meetingLink: { type: String, required: true }, // Zoom/Google Meet link
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("LiveClass", liveClassSchema);
