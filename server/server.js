require('./config/db');
require('./config/config-passport');

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const passport = require('passport');

const indexApi = require('./api/routes/index');

app.set('views', path.join(__dirname, './api/views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'build')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
	key: 'mySession',
	secret: 'map',
	cookie: {
		path: '/',
		httpOnly: true,
		maxAge: null
	},
	saveUninitialized: false,
	resave: false,
	store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "POST, GET, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use('/api', indexApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

app.listen(3001, () => {
	console.log('server is running on port: 3001');
});