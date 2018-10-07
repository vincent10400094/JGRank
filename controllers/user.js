'use strict';

const User = require('../models/user.js');
const setting = require('../setting.js');
const Crawler = require('../crawler.js');

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

exports.getUser = async function (ctx, account) {
	ctx.body = await User.findOne({ account: account })
	.select({ _id: false, __v: false });
}

exports.getClasses = async function (ctx) {
	ctx.body = await User.distinct("class");
}

exports.getYear = async function (ctx) {
	ctx.body = await User.distinct("year");
}

exports.update = async function (ctx) {
	console.log('updating user data...');
	var crawler = new Crawler();
	var page = 1;
	var data = [];
	var start = Date.now();
	while (crawler.status) {
		data = data.concat(await crawler.fetchData(setting.URL+page.toString()));
		page ++;
	}
	var ms = Date.now() - start;
	// console.log(data);
	console.log(`fetch completed, pages: ${page-1}, users: ${data.length} - ${ms}ms`);
	var updated = 0;
	data.map(data => {
		User.findOneAndUpdate({ account: data.account }, data, { upsert: true }, (err, doc) => {
			// console.log(doc, data);
			if (doc.AC != data.AC)	updated ++;
		});
	});
	console.log(`user data update completed, ${updated} users's data has changed`);
	ctx.body = (data.length !== 0);
}
