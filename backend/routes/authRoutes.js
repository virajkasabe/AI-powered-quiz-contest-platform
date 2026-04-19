import express from "express";
import {
  login,
  adminLogin,
  logout,
  signinAdmin,
} from "../controllers/authController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

//  Public Routes
router.post("/register", signinAdmin);
router.post("/login", login);
router.post("/admin-login", adminLogin);
router.post("/logout", logout);

//  Protected Route (example)

export default router;
