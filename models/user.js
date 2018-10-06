'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	rank: 		Number,
	account: 	{ type: String, index: true },
	class: 		String,
	AC: 		Number,
	url: 		String,
});

userSchema.statics.getUsers = function () {
	return this.find();
}

module.exports = mongoose.model('User', userSchema);