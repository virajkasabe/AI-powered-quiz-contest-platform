import "dotenv/config";
import Intern from "../models/intern.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { uniqueId, joiningDate } = req.body;

    //  Find user
    const user = await Intern.findOne({ uniqueId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  Check joining date

    // Convert DB date → YYYY-MM-DD
    const dbDate = new Date(user.joiningDate).toISOString().split("T")[0];

    if (dbDate !== joiningDate) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //  Generate token
    const token = jwt.sign(
      { id: user._id, domain: user.domain },
      process.env.SECRET_KEY,
      { expiresIn: "1d" },
    );

    // Send response
    res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
