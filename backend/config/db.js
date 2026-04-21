import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URL || process.env.MONGO_URI;

    if (!mongoUri) {
      console.warn("⚠️ MongoDB connection variable (MONGO_URL) is missing from environment variables.");
      return;
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    if (error.message.includes("unauthorized") || error.message.includes("whitelist")) {
      console.error("👉 Troubleshooting: Please ensure your current IP address is whitelisted in your MongoDB Atlas 'Network Access' settings.");
    }
  }
};
export default connectDB;
