import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const User = sequelize.define('user', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING},
	email: {type: DataTypes.STRING, unique: true},
	password: {type: DataTypes.STRING},
})

const ToDoList = sequelize.define('todo_list', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const ToDo = sequelize.define('todo', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	title: {type: DataTypes.STRING},
	description: {type: DataTypes.STRING},
	isDone: {type: DataTypes.BOOLEAN, defaultValue: false},
	dateComplete: {type: DataTypes.STRING}
})

User.hasOne(ToDoList);
ToDoList.belongsTo(User);

ToDoList.hasMany(ToDo);
ToDo.belongsTo(ToDoList);

const models = {User, ToDoList, ToDo};
export default models;