import jwt from "jsonwebtoken";
import "dotenv/config";
import Intern from "../models/intern.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // jwt.verify throws an error if invalid, so we wrap it or handle it in catch
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const user = await Intern.findById(decoded.userId).select("-joiningDate");

    if (!user) return res.status(404).json({ message: "user not found" });
    // Attach user to the request object
    req.user = user;

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);

    // Differentiate between JWT errors and Server errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
