import User from "../../models/User.js";

export const verifyOTP = async (req, res) => {
  const { otp } = req.body;
  try {

    const user = await User.findOne({ 'otp.otp': otp });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (new Date(user.otp.sendTime).getTime() < new Date().getTime()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // Verify OTP
    if (user.otp.otp === otp) { 
      user.otp.otp = null;
      await user.save();
      return res.status(200).json({ success: true, message: "OTP verified successfully" });
    }



  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};


