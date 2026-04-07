import express from "express";
import { submitQuiz} from "../controllers/admin.controllers.js";

const router = express.Router();

router.post("/submit-quiz", submitQuiz);


export default router;