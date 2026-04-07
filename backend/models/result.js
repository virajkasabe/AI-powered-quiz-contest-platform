
import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  internId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Intern",
  },
  contestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contest",
  },
  domain: String,

  score: Number,
  totalQuestions: Number,

  timeTaken: Number, // in seconds

  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      selectedAnswer: String,
      isCorrect: Boolean,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Result =  mongoose.model("Result", resultSchema);

export default Result;