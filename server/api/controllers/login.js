const mongoose = require('mongoose');
const passport = require('passport');

module.exports.login = function (req, res) {
	if (req.isAuthenticated()) {
		return res.redirect('/api/markers');
	}
	res.render('login', {
		title: 'Авторизация',
		msg: req.flash('message')
	});
}

module.exports.auth = function (req, res, next) {
	passport.authenticate('loginUsers', (err, user) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			req.flash('message', ' укажите правильный логин и пароль!');
			return res.redirect('http://localhost:3001/api/login');
		}
		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			return res.redirect('/api/markers');
		});
	})(req, res, next);
}
