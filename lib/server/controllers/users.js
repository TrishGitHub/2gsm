"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.login = function (req, res, next) {
	_passport2.default.authenticate("local", function (err, user, info) {

		if (err) return next(err);
		if (!user) {
			return res.json({ success: false, message: info.message });
		}

		req.logIn(user, function (loginErr) {
			if (loginErr) {
				return res.json({ success: false, message: loginErr });
			}
			return res.json({ success: true, message: "authentication succeeded" });
		});
	})(req, res, next);
};

exports.logout = function (req, res, next) {
	req.logout();
	return res.json({ success: true });
};

exports.register = function (req, res, next) {

	_user2.default.findOne({ email: req.body.email }, function (err, user) {
		if (user) {
			res.json({ success: false, message: "Email already in use" });
			return;
		} else {
			_user2.default.create(req.body, function (err) {
				if (err) {
					console.error(err);
					res.json({ success: false });
					return;
				}
				res.json({ success: true });
				return;
			});
		}
	});
};