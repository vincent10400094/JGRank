const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	rank: 		Number,
	account: 	String,
	class: 		String,
	AC: 		Number,
	url: 		String, 
});

module.exports = mongoose.model('User', userSchema);