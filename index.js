const Koa = require('koa');
const app = new Koa();
const Crawler = require('./Crawler.js');

const PORT = 3000;

const crawler = new Crawler();

const URL = 'https://judgegirl.csie.org/ranklist?page=';

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
	var page = 1;
	var data = [];
	while (crawler.success) {
		console.log(URL + page.toString());
		data = data.concat(await crawler.fetchData(URL+page.toString()))
		page ++;
	}
	console.log('fetch completed, pages:', page);;
	ctx.body = data;
});

app.listen(PORT);
console.log('listening on port:', PORT);
