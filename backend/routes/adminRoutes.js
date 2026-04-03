import express from "express";
import { generateQuiz } from "../controllers/admin.controllers.js";

const router = express.Router();

router.get("/generate-quiz", generateQuiz);

export default router;
