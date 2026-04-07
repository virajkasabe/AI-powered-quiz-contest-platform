import express from "express";
<<<<<<< HEAD
import { getLeaderboard } from "../controllers/admin.controllers.js";

const router = express.Router();

router.get("/leaderboard", getLeaderboard);
=======
import {
  getOverallLeaderboard,
  getDomainLeaderboard,
} from "../controllers/leaderboardController.js";

const router = express.Router();

// @route   GET /api/leaderboard/overall
router.get("/overall", getOverallLeaderboard);

// @route   GET /api/leaderboard/domain/:domain
router.get("/domain/:domain", getDomainLeaderboard);

>>>>>>> 2bd4b160f1bb4f94efd7f621f13076340e6201d0
export default router;
