import * as Groq_questions from "../utils/groq_Questions.js";
import Question from "../models/question.js";

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
