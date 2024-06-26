import { Router } from "express";
import * as userController from '../controllers/user_controller.js';
import authenticate from "../config/jwt.config.js";
const router = Router();

router.post('/register', userController.register);
router.get('/user',authenticate, userController.getUser);
router.put('/user',authenticate, userController.updateUser);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

export default router;