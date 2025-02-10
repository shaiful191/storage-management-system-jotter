import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import passport from "passport";
import "./config/passport.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use(passport.initialize());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
