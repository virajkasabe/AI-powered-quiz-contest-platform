import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), "backend", ".env") });
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Intern from "../models/intern.js";
import Contest from "../models/contests.js";
import Question from "../models/question.js";
import Attempt from "../models/attempt.js";

const migrateDomains = async () => {
  try {
    await connectDB();
    console.log("Connected to database for migration...");

    // 1. Migrate Interns
    const interns = await Intern.find({});
    console.log(`Checking ${interns.length} interns...`);
    for (let intern of interns) {
      if (intern.domain && intern.domain !== intern.domain.toUpperCase()) {
        const oldDomain = intern.domain;
        intern.domain = intern.domain.trim().toUpperCase();
        await intern.save();
        console.log(
          `Updated Intern ${intern.uniqueId}: ${oldDomain} -> ${intern.domain}`,
        );
      }
    }

    // 2. Migrate Contests
    const contests = await Contest.find({});
    console.log(`Checking ${contests.length} contests...`);
    for (let contest of contests) {
      if (contest.domain && contest.domain !== contest.domain.toUpperCase()) {
        const oldDomain = contest.domain;
        contest.domain = contest.domain.trim().toUpperCase();
        await contest.save();
        console.log(
          `Updated Contest ${contest.contestId}: ${oldDomain} -> ${contest.domain}`,
        );
      }
    }

    // 3. Migrate Questions
    const questions = await Question.find({});
    console.log(`Checking ${questions.length} questions...`);
    for (let question of questions) {
      if (
        question.domain &&
        question.domain !== question.domain.toUpperCase()
      ) {
        const oldDomain = question.domain;
        question.domain = question.domain.trim().toUpperCase();
        await question.save();
        console.log(
          `Updated Question ${question._id}: ${oldDomain} -> ${question.domain}`,
        );
      }
    }

    // 4. Migrate Attempts
    const attempts = await Attempt.find({});
    console.log(`Checking ${attempts.length} attempts...`);
    for (let attempt of attempts) {
      if (attempt.domain && attempt.domain !== attempt.domain.toUpperCase()) {
        const oldDomain = attempt.domain;
        attempt.domain = attempt.domain.trim().toUpperCase();
        await attempt.save();
        console.log(
          `Updated Attempt ${attempt._id}: ${oldDomain} -> ${attempt.domain}`,
        );
      }
    }

    console.log("✅ Migration complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
};

migrateDomains();
