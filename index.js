const Koa = require('koa');
const app = new Koa();
const Crawler = require('./Crawler.js');
const User = require('./models/user.js');
const mongoose = require('mongoose');

const PORT = 3000;
const URL = 'https://judgegirl.csie.org/ranklist?page=';
const mongoDB = 'mongodb://localhost/JGCrawler';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const crawler = new Crawler(URL);

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

app.on('error', (err) => {
	console.error(err.stack);
	console.log(err.message);
});

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
	User.find({}, (err, doc) => {
		if (err)	return handelError(err);
		console.log(`found ${doc.length} users`);
		return ctx.body = doc;
	});
});

app.listen(PORT, () => {console.log(`Server started on ${PORT}`)});
