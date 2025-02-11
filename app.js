import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import passport from "passport";
import "./config/passport.js";
import fileRoutes from './routes/fileRoutes.js';
import favoriteRoutes  from './routes/favoriteRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/favorite', favoriteRoutes);

export default app;