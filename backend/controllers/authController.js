import "dotenv/config";
import Intern from "../models/intern.js";
import Admin from "../models/admin.js";
import { generateToken } from "../utils/JWT.js";

// 🔐 Intern Login
export const login = async (req, res) => {
  try {
    const { uniqueId, joiningDate } = req.body;

    if (!uniqueId || !joiningDate) {
      return res.status(400).json({ message: "Enter your credentials" });
    }

    const user = await Intern.findOne({ uniqueId });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const dbDate = new Date(user.joiningDate)
      .toISOString()
      .split("T")[0];

    if (dbDate !== joiningDate) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Generate token
    const token = generateToken(user._id, res);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.uniqueId,
        userName: user.name,
        email: user.email,
        domain: user.domain,
        status: user.status,
        badgesEarned: user.badgesEarned,
        role: "intern",
      },
    });

  } catch (error) {
    console.error("Error in login controller:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// 🔐 Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(admin._id, res);

    res.status(200).json({
      token,
      id: admin._id,
      email: admin.email,
      role: admin.role,
    });

  } catch (error) {
    console.error("Error in adminLogin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🔓 Logout
export const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });

  res.status(200).json({
    message: "You are logged out",
  });
};