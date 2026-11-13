const mongoose = require("mongoose");
require("dotenv").config();

let isConnected = false;

const connectDB = async () => {
  const url = process.env.MONGO_URI;
  if (!url) {
    console.log("ℹ️ MONGO_URI not provided. Running in resilient in-memory datastore mode.");
    return false;
  }
  try {
    // 3 second connection timeout to prevent hanging if remote DB is unreachable
    await mongoose.connect(url, {
      serverSelectionTimeoutMS: 3000
    });
    isConnected = true;
    console.log("✅ MongoDB successfully connected");
    return true;
  } catch (err) {
    console.warn("⚠️ Remote MongoDB connection failed or timed out. Falling back to in-memory store seamlessly.", err.message);
    isConnected = false;
    return false;
  }
};

module.exports = connectDB;
