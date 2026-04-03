import mongoose from "mongoose";

const internSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
    unique: true,
  }, // e.g., ATHENURA/25/10115 [cite: 26]
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  }, // Decides the quiz [cite: 24, 100]
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  badgesEarned: {
    type: Number,
    default: 0,
  }, // Used for "Intern of the Month" logic [cite: 64]
});

const Intern = mongoose.model("Intern", internSchema);

export default Intern;
