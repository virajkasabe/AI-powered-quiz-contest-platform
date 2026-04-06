import Intern from "../models/intern.js";

// @desc    Get overall leaderboard (top 10 based on badges)
// @route   GET /api/leaderboard/overall
// @access  Public
export const getOverallLeaderboard = async (req, res) => {
  try {
    const topInterns = await Intern.find()
      .sort({ badgesEarned: -1 })
      .limit(10)
      .select("name uniqueId domain badgesEarned");

    res.status(200).json({
      success: true,
      count: topInterns.length,
      data: topInterns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get domain-wise leaderboard (top 10 based on badges)
// @route   GET /api/leaderboard/domain/:domain
// @access  Public
export const getDomainLeaderboard = async (req, res) => {
  try {
    const { domain } = req.params;

    if (!domain) {
      return res.status(400).json({
        success: false,
        message: "Domain is required",
      });
    }

    // Case-insensitive matching for the domain
    // This allows "web" to match "Web Development"
    const topInterns = await Intern.find({
      domain: { $regex: new RegExp(domain, "i") },
    })
      .sort({ badgesEarned: -1 })
      .limit(10)
      .select("name uniqueId domain badgesEarned");

    res.status(200).json({
      success: true,
      count: topInterns.length,
      searchedDomain: domain,
      data: topInterns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
