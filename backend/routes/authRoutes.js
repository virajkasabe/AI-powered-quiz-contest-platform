import express from "express";
import { login, adminLogin, logout } from "../controllers/authController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

//  Public Routes
router.post("/login", login);
router.post("/admin-login", adminLogin);
router.post("/logout", logout);

//  Protected Route (example)
router.get("/dashboard", protectRoute, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user,
  });
});

export default router;
