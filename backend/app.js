require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const chalk = require('chalk');
const router = require('./routes');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.resolve('..', 'frontend', 'build')));
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:3000',
	}),
);
app.use('/api', router);

app.get('/*', (req, res) => {
	res.sendFile(path.resolve('..', 'frontend', 'build', 'index.html'));
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
	app.listen(PORT, () => {
		console.log(chalk.bgCyan.bold(` Server has started on port ${PORT} `));
	});
});
