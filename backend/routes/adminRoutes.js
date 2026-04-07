import express from "express";
import multer from "multer";

// ✅ Import controllers (USE ONLY ONE FILE)
import {
  uploadInterns,
  createContest,
  generateQuiz,
} from "../controllers/admin.controllers.js";

const router = express.Router();

// ✅ Multer setup (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * ✅ Upload Interns Route
 * Handles Excel file upload with proper error handling
 */
router.post(
  "/upload-interns",
  (req, res, next) => {
    const uploadSingle = upload.single("file");

    uploadSingle(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          success: false,
          message: `Upload Error: ${err.message}. Use "file" as key in form-data.`,
        });
      } else if (err) {
        return res.status(500).json({
          success: false,
          message: "Unknown upload error occurred.",
        });
      }
      next();
    });
  },
  uploadInterns
);

/**
 * ✅ Create Contest
 */
router.post("/create-contest", createContest);

/**
 * ✅ Generate Quiz
 */
router.get("/generate-quiz", generateQuiz);

export default router;