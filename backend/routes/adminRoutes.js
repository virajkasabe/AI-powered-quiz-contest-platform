import express from "express";

import {
  uploadInterns,
  createContest,
  allInterns,
  getContestQuestions,
  updateInternStatus,
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

router.get("/all-interns", allInterns);

router.get("/get-questions/:contestId", getContestQuestions);

// 🔄 Update Intern Status (Active/Inactive)
router.patch("/update-status", updateInternStatus);

export default router;
