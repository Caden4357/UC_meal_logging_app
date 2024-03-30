import {Router} from 'express'
import * as mealController from '../controllers/meal_controller.js'

const router = Router()

router.get('/get_meals/by_user', mealController.getMeals);
router.post('/post_meal', mealController.createMeal);
router.delete('/delete_meal/:id', mealController.deleteMeal);
router.patch('/update_meal/:id', mealController.updateMeal);

export default router