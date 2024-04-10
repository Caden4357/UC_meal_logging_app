import User from "../models/user_schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    console.log('HERE');
    try {
        const newUser = new User(req.body);
        const user = await newUser.save();
        const token = jwt.sign(
            { username: user.username, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(201).json(token);
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
        const token = jwt.sign(
            { username: user.username, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json(token);
    }   
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getUser = async (req, res) => {
    try{
        console.log('HEADERS: ', req.headers.authorization);
        const decodedToken = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        console.log('DECODED TOKEN: ', decodedToken);
        const username = decodedToken.username;
        const user = await User.findOne({username});
        return res.status(200).json({token: req.headers.authorization});
    }
    catch(error){
        res.status(401).json({ message: error.message });
    }
}