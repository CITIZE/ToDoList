import models from "../models/models.js";
import ApiError from "../error/ApiError.js";

class ToDoListController {
	async create(req, res, next) {
		const toDoList = await models.ToDoList.findOne({where: {id: req.user.id}});
		const {title, description, dateComplete} = req.body;
		console.log(dateComplete);
		const toDo = await models.ToDo.create({
			todoListId: toDoList.id,
			title: title,
			description: description, 
			dateComplete: `${dateComplete}`,
		});
		return res.status(200).json({idToDo: toDo.id});
	}

	async deleteOne(req, res, next) {
		const {id} = req.body;
		const toDo = await models.ToDo.findOne({where: {id}});
		if (req.user.id !== toDo.todoListId) {
			return next(ApiError.forbidden('Нет доступа'))
		}
		await models.ToDo.destroy({where: {id}});
		return res.status(200).json({message: 'Удаление прошло успешно.'})
	}


	async getAll(req, res, next) {
		const todoListId = req.user.id
		const toDos = await models.ToDo.findAll({where: {todoListId}});
		return res.json({toDos, todoListId});
	}
}

const toDoListController = new ToDoListController();
export default toDoListController;