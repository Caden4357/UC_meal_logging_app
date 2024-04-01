import { Router } from "express";
import * as symptomsLogsController from "../controllers/symptoms_logs_controller.js";

const router = Router();

router.get("/get_symptoms_logs", symptomsLogsController.getSymptomsLog);
router.post("/post_symptom_log", symptomsLogsController.logSymptom);

export default router;
