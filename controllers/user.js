'use strict';

const User = require('../models/user.js');
const setting = require('../setting.js');
const crawler = require('../crawler.js');

exports.getUsers = async function (ctx) {
	let page = this.query.page || 1;
	let limit = setting.limit;
	let skip = (page - 1) * limit;
	ctx.body = await User.find().sort({rank: 1}).skip(skip).limit(limit)
	.select({ _id: false, __v: false });
}

exports.getUsersByYear = async function (ctx, year) {
	console.log(`get user by year: ${year}`);
	ctx.body = `get user by year: ${year}`;
}

exports.getUsersByClass = async function (ctx) {
	ctx.body = 'get user by class';
}

exports.update = async function (ctx) {

}