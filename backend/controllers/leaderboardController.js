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

    console.log("Searching domain:", domain);

    const topInterns = await Intern.find({
      domain: { $regex: domain, $options: "i" },
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