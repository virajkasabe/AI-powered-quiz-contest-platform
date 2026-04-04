import * as Groq_questions from "../utils/groq_Questions.js";
import Question from "../models/question.js";
import Intern from "../models/intern.js";
import Contest from "../models/contests.js";
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

    // Validate required fields
    if (!date || !domains || !startTime || !endTime) {
      return res.status(400).json({ message: "❌ All fields are required." });
    }

    // 🔥 Convert to string
    const datePart = new Date(date).toISOString().split("T")[0];

    const startDateTime = new Date(`${datePart}T${startTime}:00`);
    const endDateTime = new Date(`${datePart}T${endTime}:00`);

    // If domains is array → convert to string
    if (Array.isArray(domains)) {
      domains = domains.join(","); // "web,ai,app"
    } else {
      domains = String(domains);
    }

    // Check if contest already exists
    const existing = await Contest.findOne({ date });
    if (existing) {
      return res
        .status(400)
        .json({ message: "❌ Contest already exists for this date." });
    }

    const contest = await Contest.create({
      date: new Date(date),
      domains,
      startTime: startDateTime,
      endTime: endDateTime,
    });

    res.status(201).json({
      message: "✅ Contest created successfully.",
      contest,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error.", error: error.message });
  }
};
