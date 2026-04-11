import "dotenv/config";
import Intern from "../models/intern.js";
import Admin from "../models/admin.js";
import { generateToken } from "../utils/JWT.js";
import bcrypt from "bcryptjs";

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

    // ⛔ Check if account is active
    if (user.status === "Inactive") {
      return res.status(403).json({ 
        message: "❌ Your account is inactive. Please contact administration." 
      });
    }

    const dbDate = new Date(user.joiningDate).toISOString().split("T")[0];

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

export const signinAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Enter your credentials" });
    const findUser = await Admin.findOne({ email });
    if (findUser)
      return res.status(400).json({ message: "Admin allready present." });

    const newAdmin = new Admin({
      name,
      email,
      password,
    });
    const token = generateToken(newAdmin._id, res);

    await newAdmin.save();
    return res.status(200).json({ message: "New admin created ", newAdmin });
  } catch (error) {
    console.log("error in sign-in of admin", error);
    res.status(400).json({ message: "server side error" });
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
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken(admin._id, res);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
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
