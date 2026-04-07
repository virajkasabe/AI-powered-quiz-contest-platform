import express from "express";

import {
  uploadInterns,
  createContest,
  generateQuiz,
} from "../controllers/admin.controllers.js";

import { protectRoute } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import { uploadInternsFile } from "../middlewares/uploadSingleMiddleware.js";

const router = express.Router();

// 🔐 Apply authentication + admin check to all routes
router.use(protectRoute);
router.use(isAdmin);

// 📂 Upload Interns (Excel File)
router.post("/upload-interns", uploadInternsFile, uploadInterns);

// 🏆 Create Contest
router.post("/create-contest", createContest);

// 🤖 Generate Quiz
router.get("/generate-quiz", generateQuiz);

export default router;