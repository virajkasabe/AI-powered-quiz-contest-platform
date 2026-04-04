import express from "express";
import multer from "multer";
import {
  generateQuiz,
  createContest,
  uploadInterns,
} from "../controllers/admin.controllers.js";

const router = express.Router();

// Multer setup — store file in memory (not on disk)
// We read it directly using xlsx package
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Custom middleware to handle multer errors gracefully
router.post(
  "/upload-interns",
  (req, res, next) => {
    const uploadSingle = upload.single("file");
    
    uploadSingle(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // This catches "Field name missing" and sends a nice JSON response!
        return res.status(400).json({ 
          success: false,
          message: `Upload Error: ${err.message}. Please make sure you are using "file" as the key in your form-data.` 
        });
      } else if (err) {
        return res.status(500).json({ success: false, message: "Unknown upload error occurred." });
      }
      next(); // Move to the next function (uploadInterns) if no errors
    });
  },
  uploadInterns
);
router.post("/create-contest", createContest);

router.get("/generate-quiz", generateQuiz);

export default router;
