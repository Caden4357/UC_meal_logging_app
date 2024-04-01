import DailyFoodLog from "../models/daily_food_log_schema.js";

export const createDailyFoodLog = async (req, res) => {
    try {
        const dailyFoodLog = await DailyFoodLog.create(req.body);
        res.status(201).json(dailyFoodLog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDailyFoodLogs = async (req, res) => {
    try {
        const dailyFoodLogs = await DailyFoodLog.find({ userId: req.body.userId}).populate({path: 'meals'})
        res.status(200).json(dailyFoodLogs);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
