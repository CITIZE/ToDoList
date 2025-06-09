import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import sequelize from './db.js';
import models from './models/models.js';
import router from './routes/index.js';
import errorHandler from './middleware/ErrorHandlingMiddleware.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use(errorHandler);

const PORT = process.env.PORT;
async function start() {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		app.listen(PORT, 'localhost', () => {
			console.log(`Server started on port ${PORT}.`);
		})
	} catch(e) {
		console.log(e)
	}
}

start();