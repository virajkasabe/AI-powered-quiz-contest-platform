import express from "express";
import {
  getOverallLeaderboard,
  getDomainLeaderboard,
} from "../controllers/leaderboardController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(protectRoute);
// @route   GET /api/leaderboard/overall
router.get("/overall", getOverallLeaderboard);

// @route   GET /api/leaderboard/domain/:domain
router.get("/domain/:domain", getDomainLeaderboard);

export default router;
