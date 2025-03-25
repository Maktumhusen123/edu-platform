const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {}); // ✅ No need for extra options
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    setTimeout(connectDB, 5000); // ✅ Retry after 5 seconds
  }
};

module.exports = connectDB;
