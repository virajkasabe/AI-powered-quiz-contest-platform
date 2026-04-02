import "dotenv/config";

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import leaderboardRoutes from "./routes/leaderboradRoutes.js";

// Connect Database
connectDB();

const app = express();

// Init Middleware
app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// Future Routes Here
// app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
