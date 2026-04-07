import "dotenv/config";
import Intern from "../models/intern.js";
import { genreteToken } from "../utils/JWT.js";

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

    // 🔥 FIXED
    const token = genreteToken(user._id, res);

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
    console.error("error in controller", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });

  res.status(200).json({
    message: "You are logged out",
  });
};