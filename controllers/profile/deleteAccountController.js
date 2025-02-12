import User from "../../models/User.js"; 

export const deleteAccount = async (req, res) => {
  try {
      const userId = req.user.id; 
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ msg: "User not found" });
      }

      await User.findByIdAndDelete(userId);

      res.json({ msg: "Account deleted successfully" });
  } catch (err) {
      res.status(500).json({ msg: "Something went wrong" });
  }
};
