import jwt from "jsonwebtoken";
import "dotenv/config";
import Intern from "../models/intern.js";
import Admin from "../models/admin.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Try to find in Intern model first
    let user = await Intern.findById(decoded.userId).select("-joiningDate");
    
    // If not found in Intern, try Admin model
    if (!user) {
      user = await Admin.findById(decoded.userId).select("-password");
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    // Attach user to the request object
    req.user = user;

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
