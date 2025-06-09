import models from "../models/models.js";
import bcrypt, { compareSync } from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import ApiError from "../error/ApiError.js";
dotenv.config();

class UserController {
	async registration(req, res, next) {
		const {name, email, password} = req.body;
		if (!email || !password) {
			return next(ApiError.unauthorized('Неверный логин или пароль.'))
		}
		const candidate = await models.User.findOne({where:{email}});
		if (candidate) {
			return next(ApiError.unauthorized('Пользователь с таким email уже существует'));
		}
		const hashPassword = await bcrypt.hash(password, 5);
		const user = await models.User.create({name, email, password: hashPassword});
		await models.ToDoList.create({user_id: user.id});
		const token = jwt.sign({id: user.id, email: user.email}, process.env.SECRET_KEY, {expiresIn: '24h'});
		return res.json({token, name});
	}

	async login(req, res, next) {
		const {email, password} = req.body;
		const user = await models.User.findOne({where: {email}});
		if (!user) {
			return next(ApiError.forbidden('Неверный логин или пароль'));
		}
		const comparePassword = bcrypt.compareSync(password, user.password);
		if(!comparePassword) {
			return next(ApiError.forbidden('Неверный логин или пароль'));
		}
		const token = jwt.sign({id:user.id, email: email}, process.env.SECRET_KEY, {expiresIn: '24h'});
		const name = user?.name;
		return res.json({token, name});
	}

	async check(req, res, next) {
		const token = jwt.sign({id: req.user.id, email: req.user.email}, process.env.SECRET_KEY, {expiresIn: '24h'});
		return res.json({token})
	}
}

const userController = new UserController();
export default userController;