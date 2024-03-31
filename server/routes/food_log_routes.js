import {Router} from 'express'
import * as foodLogController from '../controllers/food_log_controller.js'

const router = Router()

router.get('/get_daily_food_logs/by_user', foodLogController.getDailyFoodLogs);
router.post('/post_daily_food_log', foodLogController.createDailyFoodLog);

export default router