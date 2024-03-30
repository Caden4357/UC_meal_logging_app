import Meal from "../models/meal_schema.js";
import jwt from "jsonwebtoken";

export const getMeals = async (req, res) => {
    try {
        const mealsByUser = await Meal.find({ userId: req.body.userId });
        res.status(200).json(mealsByUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createMeal = async (req, res) => {
    const meal = req.body;
    // const userId = jwt.decode(req.cookies.userToken)
    // console.log(userId);
    const newMeal = new Meal({ ...meal, userId: req.body.userId});
    try {
        await newMeal.save();
        res.status(201).json(newMeal);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

