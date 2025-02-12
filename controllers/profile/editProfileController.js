import User from "../../models/User.js"; 


export const editProfile = async (req, res) => {
  try {
      const userId = req.user.id; 
      const { username } = req.body;

      if (!username) {
          return res.status(400).json({ msg: "Username is required" });
      }

      let user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ msg: "User not found" });
      }

      user.username = username;
      await user.save();

      res.json({ msg: "Profile updated successfully", user });
  } catch (err) {
      res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
};
