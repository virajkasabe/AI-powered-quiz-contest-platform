import mongoose from "mongoose";
import "dotenv/config";
import Admin from "../models/admin.js";

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    const email = "admin@athenura.com";
    const password = "admin123"; // You can change this later

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const newAdmin = new Admin({
      email,
      password,
    });

    await newAdmin.save();
    console.log("Admin created successfully!");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    
    process.exit();
  } catch (error) {
    console.error("Error seeding admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();
