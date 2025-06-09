import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = (req, res, next) => {
	if (req.method === "OPTIONS") {
		next();
	}
	try {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) {
			return res.status(401).json({message: "Пользователь не авторизован"});
		}
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		console.log(decoded);
		req.user = decoded;
		next();
	} catch(e) {
		res.status(401).json({message: "Пользователь не авторизован"});
	}
}

export default authMiddleware;