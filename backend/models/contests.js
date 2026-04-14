import mongoose from "mongoose";

const contestSchema = new mongoose.Schema({
  contestId: {
    type: String,
    required: true,
  },
  contestTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },

  questionCount: {
    type: Number,
    default: 20,
  },
  duration: {
    type: Number, // in minutes
    required: true,
  },
});

const Contest = mongoose.model("Contest", contestSchema);

export default Contest;
