import express from "express";

import {
  getOverallLeaderboard,
  getDomainLeaderboard,
} from "../controllers/leaderboardController.js";

import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🔐 Protect all leaderboard routes
router.use(protectRoute);

// 🏆 Overall Leaderboard
// @route GET /api/leaderboard/overall
router.get("/overall", getOverallLeaderboard);

// 🏅 Domain-wise Leaderboard
// @route GET /api/leaderboard/domain/:domain
router.get("/domain/:domain", getDomainLeaderboard);

export default router;