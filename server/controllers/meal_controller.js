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

export const updateMeal = async (req, res) => {
    const {id} = req.params;
    const {feel} = req.body;
    try {
        const updatedMeal = await Meal.findByIdAndUpdate(id, {feel}, {runValidators:true, new: true});
        res.status(200).json(updatedMeal);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteMeal = async (req, res) => {
    try {
        await Meal.findByIdAndDelete(req.params.id);
        res.status(200).json('Meal deleted successfully');
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

