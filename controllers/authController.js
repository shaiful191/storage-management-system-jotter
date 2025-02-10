import { registerUser, loginUser } from "../services/authService.js";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";


export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const result = await registerUser(username, email, password);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);
        res.json(result);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

// Nodemailer Transporter (Configure Your Email Service)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS, // App Password (not your actual Gmail password)
    },
});




// Forgot Password API
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Generate a 6-digit code
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Save the code in DB
        user.resetCode = resetCode;
        await user.save();

        // Send email with reset code
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Code",
            text: `Your password reset code is: ${resetCode}`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "Verification code sent to your email" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};


// Reset Password API
export const resetPassword = async (req, res) => {
    try {
        const { email, resetCode, newPassword } = req.body;

        // Find user
        const user = await User.findOne({ email, resetCode });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid reset code" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetCode = null; // Clear reset code
        await user.save();

        res.json({ success: true, message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};