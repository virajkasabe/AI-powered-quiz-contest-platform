import express from "express";
import { getLeaderboard } from "../controllers/admin.controllers.js";
import {
  getOverallLeaderboard,
  getDomainLeaderboard,
} from "../controllers/leaderboardController.js";




const router = express.Router();

router.get("/leaderboard", getLeaderboard);

// @route   GET /api/leaderboard/overall
router.get("/overall", getOverallLeaderboard);

// @route   GET /api/leaderboard/domain/:domain
router.get("/domain/:domain", getDomainLeaderboard);

export default router;
