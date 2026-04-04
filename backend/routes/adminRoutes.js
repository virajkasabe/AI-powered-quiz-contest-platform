import express from "express";
import multer from "multer";
import uploadInterns from "../controllers/adminController.js";
import { createContest } from "../controllers/adminController.js";

const router = express.Router();

// Multer setup — store file in memory (not on disk)
// We read it directly using xlsx package
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload-interns', upload.single('file'),  uploadInterns);
router.post('/create-contest', createContest)

export default router;
