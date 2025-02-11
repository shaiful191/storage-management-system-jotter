import User from "../../models/User.js";  
import crypto from "crypto";
import sendMail from "../../utils/sendMail.js";

export const forgotPassword = async (req, res) => {
  try {
      const { email } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      if (user.otp.otp && new Date(user.otp.sendTime).getTime() > new Date().getTime()) {
          return res.status(400).json({ success: false, message: "Verification code already sent" });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      // console.log(otp);
      const token = crypto.randomBytes(32).toString("hex");

      user.otp.otp = otp;
      user.otp.sendTime = new Date().getTime() + 1 * 60 * 1000;
      user.otp.token = token;

      await user.save();
      await sendMail(otp, email);

      res.status(200).json({
          success: true,
          message: "Verification code sent to your email",
          token,
      });

  } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error });
  }
};