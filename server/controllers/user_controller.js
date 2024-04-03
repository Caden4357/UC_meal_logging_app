import User from "../models/user_schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function signToken(user) {
    return jwt.sign(
        { username: user.username, email: user.email },
        process.env.JWT_SECRET
    );
}
function signTokenToCookie(res, user) {
    const userToken = signToken(user);
    res.cookie("userToken", userToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
}

export const register = async (req, res) => {
    console.log('HERE');
    try {
        const newUser = new User(req.body);
        const user = await newUser.save();
        signTokenToCookie(res, user);
        res.status(201).json(user);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({
            username: username,
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        signTokenToCookie(res, user);
        res.status(200).json(user);
    }   
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}