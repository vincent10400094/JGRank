'use strict';

const mongoose = require('mongoose');
const setting = require('./setting.js')

module.exports = {
	DBSetup: function() {
		mongoose.connect(setting.DB);
		mongoose.Promise = global.Promise;
		// success connection message
		mongoose.connection.on('connected', () => {
			console.log('Mongoose successfully connected to:', setting.DB);
		});
		// connection fail message
		mongoose.connection.on('error', (err) => {
			console.log('Mongoose connection error:', err);
		});
		// disconnection message
		mongoose.connection.on('disconnected', () => {
			console.log('Mongoose disconnected');
		});
		// close mongoose connection when app terminated
		process.on('SIGINT', () => {
			mongoose.connection.close(() => {
				console.log('Mongoose connection closed through app termination');
				process.exit(0);
			});
		});
	}
};