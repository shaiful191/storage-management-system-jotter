import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (username, email, password) => {
    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
    }

    let user = await User.findOne({ email });
    if (user) {
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = generateToken(user.id);

    return { token, userId: user.id };
};


export const loginUser = async (email, password) => {
    let user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken(user.id);

    return { token, userId: user.id };
};
