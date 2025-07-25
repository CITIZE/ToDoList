import ApiError from "../error/ApiError.js";

const errorHandler = function ErrorHandlingMiddleware (err, req, res, next) {
	if (err instanceof ApiError) {
		 return res.status(err.status).json({message: err.message})
	};
	return res.status(500).json({message: "Непредвиденная ошибка!"})
}
export default errorHandler;