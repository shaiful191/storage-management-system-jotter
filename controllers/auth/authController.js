import { registerUser, loginUser } from "../../services/authService.js";
import crypto from "crypto";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const result = await registerUser(username, email, password);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);
        res.json(result);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};




