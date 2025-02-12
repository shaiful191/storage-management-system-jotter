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
  otp: {
    otp: { type: String, default: null },
    sendTime: { type: Number, default: null },
    token: { type: String, default: null },
  }, 
  storageLimit: { type: Number, default: 15 * 1024 * 1024 * 1024 },  
  usedStorage: { type: Number, default: 0 },  

}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;


