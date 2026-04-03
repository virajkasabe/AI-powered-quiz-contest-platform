import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
  internId: {
    type: String,
    required: true,
  },
  contestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contest",
  },
  badgeName: {
    type: String,
    default: "Domain Winner",
  },
  dateAwarded: {
    type: Date,
    default: Date.now,
  },
});

const Badge = mongoose.model("Badge", badgeSchema);
