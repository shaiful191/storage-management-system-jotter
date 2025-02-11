import User from "../models/User";

// export const resetPassword = async (req, res) => {
//   try {
//     const { email, resetCode, newPassword } = req.body;     

//     // Find user
//     const user = await User.findOne({ email, resetCode });
//     if (!user) {
//       return res.status(400).json({ success: false, message: "Invalid reset code" });
//     }

//     // Hash new password  
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);
//     user.resetCode = null; // Clear reset code
//     await user.save();

//     res.json({ success: true, message: "Password reset successful" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error });
//   }
// };