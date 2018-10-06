'use strict';

const User = require('../models/user.js');
const setting = require('../setting.js');

exports.getUsers = async function (ctx) {
	let page = this.query.page || 1;
	let limit = setting.limit;
	let skip = (page - 1) * limit;
	ctx.body = await User.find().sort({rank: 1}).skip(skip).limit(limit);
}