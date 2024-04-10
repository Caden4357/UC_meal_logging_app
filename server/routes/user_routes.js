import { Router } from "express";
import * as userController from '../controllers/user_controller.js';
import authenticate from "../config/jwt.config.js";
const router = Router();

router.post('/register', userController.register);
router.get('/user',authenticate, userController.getUser);
router.post('/login', userController.login);

export default router;