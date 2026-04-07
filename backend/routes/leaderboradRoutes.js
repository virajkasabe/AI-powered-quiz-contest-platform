import express from "express";
import { getLeaderboard } from "../controllers/admin.controllers.js";

const router = express.Router();

router.get("/leaderboard", getLeaderboard);
export default router;
