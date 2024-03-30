import {Router} from 'express'
import * as mealController from '../controllers/meal_controller.js'

const router = Router()

router.get('/get_meals/by_user', mealController.getMeals)
router.post('/post_meal', mealController.createMeal)

export default router