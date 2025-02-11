import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { register, login,forgotPassword } from "../controllers/authController.js";
import { verifyOTP } from "../controllers/verifyOTPController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//  Google OAuth Callback (Handles Redirect from Google)
router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Google authentication failed" });
    }

    // Extract user and token from req.user
    const { user, token } = req.user;

    //  Redirect to frontend with JWT token (Optional)
    // return res.redirect(`http://localhost:3000/dashboard?token=${token}`);

    return res.json({
      success: true,
      message: "Google login successful",
      user,
      token
    });
  }
);

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
// router.post("/reset-password", resetPassword);


export default router;
