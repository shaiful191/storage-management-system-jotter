import User from "../../models/User.js";
import bcrypt from "bcryptjs";

export const resetPassword = async (req, res) => {
  const { newPassword, token } = req.body;

  try {
   
    const user = await User.findOne({ "otp.token": token });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid reset token" });
    }
    
    if (user.otp.otp) {
      return res.status(400).json({ success: false, message: "OTP verification required" });
    }

    if (new Date(user.otp.sendTime).getTime() + 5 * 60 * 1000 < new Date().getTime()) {
      return res.status(400).json({ success: false, message: "Token expired" });
    }

    
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.otp.token = null;
    user.otp.sendTime = null;

    await user.save();

    res.status(200).json({ success: true, message: "Password reset successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};


