'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	rank: 		{ type: Number, index: true },
	account: 	{ type: String, index: true },
	class: 		String,
	AC: 		Number,
	url: 		String,
	year: 		{ type: String, default: "" }
});

module.exports = mongoose.model('User', userSchema);