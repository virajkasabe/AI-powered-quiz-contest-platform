import express from "express";
import {
  submitQuiz,
  startQuiz,
  getUpcomingQuizzes,
  getInternHistory,
  getInternStats,
} from "../controllers/intern.controller.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protectRoute);

router.post("/submit-quiz", submitQuiz);
router.post("/start-quiz", startQuiz);
router.get("/upcoming-quizzes", getUpcomingQuizzes);
router.get("/history", getInternHistory);
router.get("/stats", getInternStats);

export default router;
