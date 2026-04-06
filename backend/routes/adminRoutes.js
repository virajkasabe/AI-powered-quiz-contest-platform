import express from "express";
import multer from "multer";

// Import from both controllers
import uploadInterns, { createContest } from "../controllers/adminController.js";
import { generateQuiz } from "../controllers/admin.controllers.js";

const router = express.Router();

// Multer setup (store file in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Admin Routes
router.post('/upload-interns', upload.single('file'), uploadInterns);
router.post('/create-contest', createContest);

// ✅ Quiz Route
router.get("/generate-quiz", generateQuiz);

export default router;