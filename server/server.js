import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose_connect.js';
import userRoutes from './routes/user_routes.js';
import mealRoutes from './routes/meal_routes.js';
const app = express();
app.use(express.json(), cors({ origin: 'http://127.0.0.1:5173'}));
app.use('/api', userRoutes);
app.use('/api', mealRoutes);
dotenv.config();
const PORT = process.env.PORT;
dbConnect();
app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);

