const mongoose = require("mongoose");

// Function to connect to MongoDB database
const connectDB = async () => {
  try {
    // use environment variable OR fallback to local database
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolioDB";

    // connect to MongoDB using mongoose
    await mongoose.connect(uri);

    // log success message
    console.log("MongoDB connected");
  } catch (error) {
    // log error if connection fails
    console.error("MongoDB connection error:", error.message);

    // stop server if database connection fails
    process.exit(1);
  }
};

module.exports = connectDB;