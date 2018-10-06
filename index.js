const Koa = require('koa');
const app = new Koa();
const Crawler = require('./Crawler.js');
const User = require('./models/user.js');
const mongoose = require('mongoose');

const PORT = 3000;
const URL = 'https://judgegirl.csie.org/ranklist?page=';
const mongoDB = 'mongodb://localhost/JGCrawler';

const crawler = new Crawler(URL);

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

// logger
app.use(async (ctx, next) => {
	await next();
	const rt = ctx.response.get('X-Response-Time');
	console.log(`${ctx.method} ${ctx.url} - ${rt} ${ctx.status}`);
});

// x-response-time
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
 	ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(async ctx => {
	ctx.body = data;
	data.map((data, i) => {
		var user = new User(data);
		let query = { account: data.account };
		// User.findOneAndUpdate(query, {}, (err, doc) => {
		// 	if (err) {
		// 		console.log(err);
		// 	} else {
		// 		console.log(`user #${i} updated successfully`);
		// 	}
		// });
		// console.log(data.account);
		// console.log(`user #${i}: ${data.account}`);
	});
});

app.listen(PORT);
console.log('listening on port:', PORT);
