import {Router} from 'express'
import * as mealController from '../controllers/meal_controller.js'
import authenticate from '../config/jwt.config.js';
const router = Router()

router.get('/get_food_log',authenticate, mealController.getMeals);
router.post('/log_food_image',authenticate, mealController.createMeal);
router.delete('/delete_meal/:id',authenticate, mealController.deleteMeal);
router.patch('/update_meal/:id',authenticate, mealController.updateMeal);

export default router