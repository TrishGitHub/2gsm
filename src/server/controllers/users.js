import mongoose from "mongoose";
import passport from "passport";
import User from "../models/user";

exports.login = function(req, res, next) {
	passport.authenticate("local", function(err, user, info) {		

		if(err) return next(err)
		if(!user) {
			return res.json({ success: false, message: info.message })			
		}

		req.logIn(user, loginErr => {
			if(loginErr) {
				return res.json({ success: false, message: loginErr })
			}
			return res.json({ success: true, message: "authentication succeeded" })
		})
	})(req, res, next)
};

exports.logout = function(req, res, next) {
	req.logout()
	return res.json({ success: true })
};

exports.register = function(req, res, next) {
	
	User.findOne({ email: req.body.email }, (err, user) => {
		if (user) {			
			res.json({ success: false, message: "Email already in use" })
			return 
		}
		else {
			User.create(req.body, (err) => {
				if (err) {
					console.error(err)
					res.json({ success: false })
					return
				}
				res.json({ success: true })
				return 
			})
		}
	})

};