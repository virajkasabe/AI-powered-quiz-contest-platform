import express from "express";
import {
  generateQuiz,
  createContest,
  uploadInterns,
} from "../controllers/admin.controllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import { uploadInternsFile } from "../middlewares/uploadSingleMiddleware.js";

const router = express.Router();

// Apply protection to all routes in this file
router.use(protectRoute);
router.use(isAdmin);

// Admin-only actions
router.post("/upload-interns", uploadInternsFile, uploadInterns);
router.post("/create-contest", createContest);
router.get("/generate-quiz", generateQuiz);

export default router;
