import Meal from "../models/meal_schema.js";
import jwt from "jsonwebtoken";
import Image from "../models/image.model.js";
export const getMeals = async (req, res) => {
    try {
        const decodedToken = jwt.decode(req.headers.authorization, {complete: true});
        const id = decodedToken.payload.id;
        const mealsByUser = await Meal.find({ userId: id }).populate('image').populate('userId');
        res.status(200).json(mealsByUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createMeal = async (req, res) => {
    try{
        const decodedToken = jwt.decode(req.headers.authorization, {complete: true});
        const id = decodedToken.payload.id;
        console.log('req.body', req.body.imageUrl);
        console.log('id', id);
        const image = await Image.create({url: req.body.imageUrl});
        const meal = {image: image._id, foodName: req.body.foodName, userId: id};
        const mealDoc = await Meal.create(meal);
        res.status(201).json(mealDoc);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
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

