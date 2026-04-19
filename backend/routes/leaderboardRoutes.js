import express from "express";

import {
  getOverallLeaderboard,
  getDomainLeaderboard,
  getContestLeaderboard,
  getLeaderboardStats,
  finalizeContest,
} from "../controllers/leaderboardController.js";

import { protectRoute } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// 🔐 Protect all leaderboard routes
router.use(protectRoute);

// 📈 Leaderboard Stats
router.get("/stats", getLeaderboardStats);

// 🏆 Overall Leaderboard
router.get("/overall", getOverallLeaderboard);

// 🏅 Domain-wise Leaderboard
router.get("/domain/:domain", getDomainLeaderboard);

// 📊 Contest-specific Leaderboard
router.get("/contest/:contestId", getContestLeaderboard);

// 🏁 Finalize Contest (Admin only)
router.post("/finalize", isAdmin, finalizeContest);

export default router;