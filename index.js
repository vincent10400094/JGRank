'user strict';

const Koa = require('koa');
const route = require('koa-route');

// controllers
const userController = require('./controllers/user');

const setting = require('./setting.js');
const DB = require('./db.js');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// setup mongoDB
DB.setup();

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

// routers
app.use(route.get('/api/users', userController.getUsers));
app.use(route.get('/api/users/year/:year', userController.getUsersByYear));
app.use(route.get('/api/users/class/:class', userController.getUsersByClass));
app.use(route.get('/api/user/:account', userController.getUser));
app.use(route.get('/api/classes', userController.getClasses));
app.use(route.get('/api/year', userController.getYear));
app.use(route.get('/api/update', userController.update));

// console.log('setting:', setting);
app.listen(setting.PORT, () => {console.log(`Server started on ${setting.PORT}`)});
