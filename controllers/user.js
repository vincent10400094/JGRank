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
	let page = this.query.page || 1;
	let limit = setting.limit;
	let skip = (page - 1) * limit;
	let re = new RegExp('^'+year);
	ctx.body = await User.find({ account: { $regex: re } }).sort({ rank: 1 })
	.skip(skip).limit(limit).select({ _id: false, __v: false });
}

exports.getUsersByClass = async function (ctx, cla) {
	let page = this.query.page || 1;
	let limit = setting.limit;
	let skip = (page - 1) * limit;
	ctx.body = await User.find({ class: cla }).sort({rank: 1}).skip(skip).limit(limit)
	.select({ _id: false, __v: false });
}

exports.update = async function (ctx) {

}