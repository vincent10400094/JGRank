'user strict';

const Koa = require('koa');
const route = require('koa-route');
const serve = require('koa-static');
const send = require('koa-send');

// controllers
const userController = require('./controllers/user.js');

const setting = require('./setting.js');
const DB = require('./db.js');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// setup mongoDB
DB.setup();

// create app instance
const app = new Koa();

// on error
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

// static file serving middleware
app.use(serve(__dirname + '/public'));
// app.use(route.get('/static', serve(__dirname + '/public')));

// api routers
app.use(route.get('/api/users', userController.getUsers));
app.use(route.get('/api/users/year/:year', userController.getUsersByYear));
app.use(route.get('/api/users/class/:class', userController.getUsersByClass));
app.use(route.get('/api/user/:account', userController.getUser));
app.use(route.get('/api/classes', userController.getClasses));
app.use(route.get('/api/year', userController.getYear));
app.use(route.get('/api/update', userController.update));

// index page
app.use(route.get('/', async function(ctx) { await send(ctx, '/index.html'); }));

// console.log('setting:', setting);
app.listen(setting.PORT, () => {console.log(`Server started on ${setting.PORT}`)});
