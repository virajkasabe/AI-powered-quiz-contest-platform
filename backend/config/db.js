import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    if (error.message.includes("unauthorized") || error.message.includes("whitelist")) {
      console.error("👉 Troubleshooting: Please ensure your current IP address is whitelisted in your MongoDB Atlas 'Network Access' settings.");
    }
    process.exit(1);
  }
};
export default connectDB;
