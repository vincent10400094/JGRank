'use strict';

const User = require('../models/user.js');
const setting = require('../setting.js');

exports.getUsers = function () {
	this.body = User.getUsers();
}