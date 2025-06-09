import { Router } from "express";
import models from "../models/models.js";
import authMiddleware from "../middleware/authMiddleware.js";
import toDoListControllers from "../controllers/toDoListController.js";

const toDoListRouter = new Router();
toDoListRouter.post('/', authMiddleware, toDoListControllers.create);
toDoListRouter.get('/', authMiddleware, toDoListControllers.getAll);
toDoListRouter.delete('/', authMiddleware, toDoListControllers.deleteOne);

export default toDoListRouter;