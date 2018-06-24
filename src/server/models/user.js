import bcrypt from "bcrypt-nodejs";
import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
	email: { 
		type: String,
		unique: true,
		lowercase: true
	},
	password: String	
});

UserSchema.pre("save", function(next) {
	let user = this;
	if (!user.isModified("password")) return next()
	bcrypt.genSalt(5, (err, salt) => {
		if (err) return next(err)
		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) return next(err)
			user.password = hash
			next()
		})
	})
});

 UserSchema.methods = {
 	comparePassword: function(candidatePassword, cb) {
 		bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
 			if (err) return cb(err)
 			cb(null, isMatch)
 		})
 	}
 };

UserSchema.statics = {};

export default mongoose.model("User", UserSchema)

