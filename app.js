const express = require('express');
const path = require('path');
const httpLogger = require('./config/log').httpLogger;
global.logger = require('./config/log').logger;

// router
const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logger
app.use(httpLogger);

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	res.status(404).send('Sorry cant find that!')
});

// error handler
app.use(function (err, req, res, next) {
	logger.error("error handler :", err.stack);
	res.status(500).send("unexpected error!");
});

module.exports = app;
