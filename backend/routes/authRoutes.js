import express from "express";
import { login } from "../controllers/authController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

//  Public Route (Login)
router.post("/login", login);

//  Protected Route (example)
router.get("/dashboard", protectRoute, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user,
  });
});

export default router;
