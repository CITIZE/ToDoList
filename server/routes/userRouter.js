import { Router } from "express";
import models from "../models/models.js";
import toDoListRouter from "./toDoListRouter.js";
import authMiddleware from "../middleware/authMiddleware.js";
import userController from '../controllers/userController.js';

const userRouter = new Router();
userRouter.post('/registration', userController.registration);
userRouter.post('/login', userController.login);
userRouter.get('/check', authMiddleware, userController.check);
userRouter.use('/to-do-list', toDoListRouter)

export default userRouter;