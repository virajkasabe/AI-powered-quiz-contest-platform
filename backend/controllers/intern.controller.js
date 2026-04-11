import Contest from "../models/contests.js";
import Question from "../models/question.js";
import Result from "../models/result.js";
import Intern from "../models/intern.js";

export const startQuiz = async (req, res) => {
  try {
    const { contestId } = req.body;
    const internId = req.user._id;

    if (!contestId) {
      return res.status(400).json({ message: "❌ contestId is required." });
    }

    // 1. Find Contest
    const contest = await Contest.findOne({ contestId });
    if (!contest) {
      return res.status(404).json({ message: "❌ Contest not found." });
    }

    // 2. Check Timing
    const now = new Date();
    if (now < contest.startTime) {
      return res.status(400).json({ message: "❌ This contest has not started yet." });
    }
    if (now > contest.expiryDate) {
      return res.status(400).json({ message: "❌ This contest has expired." });
    }

    // 3. Check for Existing Submission
    const existingResult = await Result.findOne({ internId, contestId });
    if (existingResult) {
      return res.status(403).json({ 
        message: "❌ You have already submitted this quiz. Multiple attempts are not allowed." 
      });
    }

    // 4. Fetch Questions (Without Correct Answers)
    const questions = await Question.find({ contestId }).select("-correctAnswer");

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: "❌ No questions found for this contest." });
    }

    res.status(200).json({
      success: true,
      message: "🚀 Quiz started successfully.",
      data: {
        contestDetails: {
          contestId: contest.contestId,
          domain: contest.domain,
          duration: contest.duration,
          expiryDate: contest.expiryDate,
        },
        questions,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Internal server error.", error: error.message });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { contestId, domain, answers } = req.body;
    const internId = req.user._id;
    const Domain = domain.trim().toUpperCase();

    // 1. Check if Contest exists and is ACTIVE
    const contest = await Contest.findOne({ contestId });
    if (!contest) {
      return res.status(404).json({ message: "❌ Contest not found." });
    }

    const now = new Date();
    if (now < contest.startTime) {
      return res.status(400).json({ message: "❌ This contest hasn't started yet." });
    }
    if (now > contest.expiryDate) {
      return res.status(400).json({ message: "❌ This contest has expired." });
    }

    let score = 0;

    // Get all questions
    const questionIds = answers.map((a) => a.questionId);
    const questions = await Question.find({ _id: { $in: questionIds } });

    const questionMap = {};
    questions.forEach((q) => {
      questionMap[q._id] = q;
    });

    // Calculate score
    const evaluatedAnswers = answers.map((a) => {
      const question = questionMap[a.questionId];
      const isCorrect = question.correctAnswer === a.selectedAnswer;

      if (isCorrect) score++;

      return {
        ...a,
        isCorrect,
      };
    });

    // Save result
    const result = await Result.create({
      internId,
      contestId,
      domain: Domain,
      score,
      totalQuestions: questions.length,
      timeTaken: req.body.timeTaken,
      answers: evaluatedAnswers,
    });

    res.json({
      success: true,
      score,
      total: questions.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUpcomingQuizzes = async (req, res) => {
  try {
    const domain = req.user.domain;
    if (!domain) {
      return res.status(400).json({ message: "❌ Intern domain not found." });
    }

    const Domain = domain.trim().toUpperCase();
    const now = new Date();

    // Find all contests in user's domain that haven't expired yet
    const contests = await Contest.find({
      domain: Domain,
      expiryDate: { $gt: now },
    }).sort({ startTime: 1 });

    res.status(200).json({
      success: true,
      count: contests.length,
      data: contests,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error.", error: error.message });
  }
};
export const getInternHistory = async (req, res) => {
  try {
    const internId = req.user._id;

    // Fetch all results for the logged-in intern
    const history = await Result.find({ internId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error.", error: error.message });
  }
};
