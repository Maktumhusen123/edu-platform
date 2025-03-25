const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
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
    issuedAt: { type: Date, default: Date.now },
    certificateUrl: { type: String, required: true }, // URL for the certificate PDF/image
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);
