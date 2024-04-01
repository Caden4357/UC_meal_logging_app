import {Router} from 'express'
import * as symptomController from '../controllers/symptoms_controller.js'

const router = Router()

router.get('/get_symptoms', symptomController.getSymptoms);
router.post('/post_symptom', symptomController.createSymptom);

export default router
