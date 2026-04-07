import * as Groq_questions from "../utils/groq_Questions.js";
import mongoose from "mongoose";
import Question from "../models/question.js";
import Intern from "../models/intern.js";
import Contest from "../models/contests.js";
import Result from "../models/result.js";
import xlsx from "xlsx";
import "dotenv/config";

export const generateQuiz = async (req, res) => {
  try {
    const { count, domain, difficulty } = req.body;

    const existingQuestions = await Question.find({ domain }).select(
      "questionText -_id", // 👈 changed from "text" to "questionText"
    );
    const forbiddenList = existingQuestions.map((q) => q.questionText); // 👈 changed from q.text

    const questionsData = await Groq_questions.Groq_questions(
      domain,
      forbiddenList,
      count,
    );

    const filteredQuestions = questionsData.filter(
      (q) => !forbiddenList.includes(q.question),
    );

    if (filteredQuestions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "AI generated only duplicate questions. Try again.",
      });
    }

    // 4. Save to MongoDB
    const savedQuestions = await Question.insertMany(
      filteredQuestions.map((q) => ({
        questionText: q.question, // 👈 changed 'text' to 'questionText'
        options: q.options,
        correctAnswer: q.correctAnswer, // 👈 changed 'answer' to 'correctAnswer'
        domain,
        // Optional: you can remove 'difficulty' because it doesn't exist in your mongoose schema!
        createdAt: new Date(),
      })),
    );

    res.status(201).json({
      success: true,
      count: savedQuestions.length,
      data: savedQuestions,
    });
  } catch (error) {
    console.error("Deduplication Error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to generate unique quiz" });
  }
};

export const uploadInterns = async (req, res) => {
  try {
    // req.file is provided by multer (file upload middleware)
    if (!req.file) {
      return res.status(400).json({ message: "❌ No file uploaded." });
    }

    // Read the uploaded Excel file from memory
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0]; // first sheet
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet); // convert to array of objects

    if (rows.length === 0) {
      return res.status(400).json({ message: "❌ Excel file is empty." });
    }

    // Prepare operations for bulk insertion
    const operations = rows.map((row) => ({
      updateOne: {
        filter: { uniqueId: row.uniqueId },
        update: {
          $setOnInsert: {
            uniqueId: row.uniqueId,
            name: row.name,
            email: row.email,
            domain: row.domain,
            joiningDate: new Date(row.joiningDate),
            status: row.status || "Active",
          },
        },
        upsert: true,
      },
    }));

    // Execute bulkWrite
    const result = await Intern.bulkWrite(operations);
    const added = result.upsertedCount;
    const skipped = rows.length - added;

    res.json({
      message: `✅ Upload complete. Added: ${added}, Skipped (duplicates): ${skipped}`,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error.", error: error.message });
  }
};
export const createContest = async (req, res) => {
  try {
    let { date, domains, startTime, endTime } = req.body;

    // ✅ Validate
    if (!date || !domains || !startTime || !endTime) {
      return res.status(400).json({ message: "❌ All fields are required." });
    }

    // ✅ Ensure domains is ARRAY (IMPORTANT)
    if (!Array.isArray(domains)) {
      domains = [domains]; // convert single value to array
    }

    // 🧠 Clean domains (remove spaces, lowercase)
    domains = domains.map(d => d.trim().toLowerCase());

    // 🔥 Date handling
    const datePart = new Date(date).toISOString().split("T")[0];

    const startDateTime = new Date(`${datePart}T${startTime}:00`);
    const endDateTime = new Date(`${datePart}T${endTime}:00`);

    // ✅ Check existing contest
    const existing = await Contest.findOne({ date: new Date(date) });
    if (existing) {
      return res
        .status(400)
        .json({ message: "❌ Contest already exists for this date." });
    }

    // ✅ Save PROPER STRUCTURE
    const contest = await Contest.create({
      date: new Date(date),
      domains, // ✅ ARRAY STORE (FIXED)
      startTime: startDateTime,
      endTime: endDateTime,
    });

    res.status(201).json({
      message: "✅ Contest created successfully.",
      contest,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Server error.",
      error: error.message,
    });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { internId, contestId, domain, answers } = req.body;

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
      domain,
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





export const getLeaderboard = async (req, res) => {
  try {
    const { domain, contestId } = req.query;

    // ✅ Build filter safely
    let filter = {};

    if (domain) {
      filter.domain = domain.trim();
    }

    if (contestId) {
      // 🔥 HANDLE BOTH CASES (String + ObjectId)
      filter.$or = [
        { contestId: contestId }, // if stored as string
        ...(mongoose.Types.ObjectId.isValid(contestId)
          ? [{ contestId: new mongoose.Types.ObjectId(contestId) }]
          : []),
      ];
    }

    // ✅ Fetch data
    const leaderboard = await Result.find(filter)
      .populate("internId", "name email")
      .sort({ score: -1, timeTaken: 1 });

    // ❗ DEBUG (IMPORTANT - REMOVE LATER)
    console.log("FILTER:", filter);
    console.log("RESULT:", leaderboard);

    // ✅ Add rank
    const ranked = leaderboard.map((item, index) => ({
      rank: index + 1,
      name: item.internId?.name || "Unknown",
      email: item.internId?.email || "No Email",
      score: item.score,
      timeTaken: item.timeTaken,
    }));

    return res.json({
      success: true,
      count: ranked.length,
      data: ranked,
    });
  } catch (error) {
    console.error("Leaderboard Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};