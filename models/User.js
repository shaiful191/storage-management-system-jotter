import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true }, // Only for Google login users
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function () {
      return !this.googleId; // Require password only if Google ID is NOT present
    },
    minlength: 8,
  },
  resetCode: { type: String, default: null }, // Stores the 6-digit reset code
 
  storageLimit: { type: Number, default: 15 * 1024 * 1024 * 1024 }, // 15 GB limit in bytes
  usedStorage: { type: Number, default: 0 }, // Tracks the total storage used by the user

});

const User = mongoose.model("User", userSchema);

export default User;


