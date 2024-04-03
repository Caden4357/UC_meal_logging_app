import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose_connect.js';
import userRoutes from './routes/user_routes.js';
import mealRoutes from './routes/meal_routes.js';
import foodLogRoutes from './routes/food_log_routes.js';
import symptomRoutes from './routes/symptom_routes.js';
import symptomsLogsRoutes from './routes/symptoms_logs_routes.js';
const app = express();
app.use(express.json(), cors({origin:'*'}));
app.use('/api', userRoutes);
app.use('/api', mealRoutes);
app.use('/api', foodLogRoutes);
app.use('/api', symptomRoutes);
app.use('/api', symptomsLogsRoutes);
dotenv.config();
const PORT = process.env.PORT;
dbConnect();
app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);

