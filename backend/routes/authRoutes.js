import express from "express";
import { login } from "../controllers/authController.js";
import authMiddleware from "../midlleware/authMiddleware.js";

const router = express.Router();

//  Public Route (Login)
router.post("/login", login);

//  Protected Route (example)
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user,
  });
});

export default router;