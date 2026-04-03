import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  domain: {
    type: String,
    required: true,
  },

  contestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contest",
  },
  // Links to specific contest [cite: 81]
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ], // Array of 4 options [cite: 44]
  correctAnswer: {
    type: String,
    required: true,
  },
  contestDate: {
    type: Date,
  }, // Used for deduplication check [cite: 47, 81]
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
