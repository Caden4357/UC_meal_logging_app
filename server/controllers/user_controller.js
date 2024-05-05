import User from "../models/user_schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    console.log('HERE');
    try {
        console.log('REQ BODY: ', req.body);
        const user = await User.create(req.body);
        console.log('NEW USER: ', user);
        const token = jwt.sign(
            { username: user.username, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        const userRes = { username: user.username, token: token}

        res.status(201).json(userRes);
    } catch (error) {
        console.log('ERROR: ', error);
        res.status(409).json(error);
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
        const userRes = { username: user.username, token: token}

        res.status(200).json(userRes);
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
export const updateUser = async (req, res) => {
    try{
        const decodedToken = jwt.decode(req.headers.authorization, {complete: true});
        const id = decodedToken.payload.id;
        const user = await User.findByIdAndUpdate(id, req.body, {runValidators:true, new:true})
        return res.status(200).json(user);
    }
    catch(error){
        console.log(error);
        res.status(401).json(error);
    }
}

export const logout = async (req, res) => {
    try{
        console.log('LOGOUT');
        req.headers.authorization = '';
        // remove token from jwt
        jwt.decode(req.headers.authorization, {complete: true});
        return res.status(200).json({message: 'Logged out'});
    }
    catch(error){
        console.log(error);
        res.status(401).json(error);
    }
}